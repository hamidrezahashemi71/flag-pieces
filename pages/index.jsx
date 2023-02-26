import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useState } from 'react'
import { getUsers } from '../apis'
import { useQuery, dehydrate } from '@tanstack/react-query'
import Loading from '../components/main/Loading'
import { queryClient } from "./_app";
import GameSection from '../components/game/GameSection'

export async function getStaticProps() {

  await queryClient.prefetchQuery(['users'], getUsers)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function Home() {

  const [data, setData] = useState(null)

  useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
    onSettled: (data) => {

      const customizedUsers = data.reduce((acc, cur) => ([...acc, {
        name: cur['name']['common'] ?? 'Unknown',
        image: cur['coatOfArms']['svg'] ?? process.env.DEFAULT_FLAG,
      }]), [])
  
      let page = 1
      const clone = {}
      const userPerPage = 10
      for (let i = 0; i <= customizedUsers.length - userPerPage; i + userPerPage) {
        clone[page] = customizedUsers.splice(i, userPerPage)
        page ++
      }

      setData({
        customized: { ...clone },
        filteredData: null,
        textEntered: false
      })
    }
  })
  
  const setFilteredFlags = (filteredData, isTextEntered) => {

    if(!isTextEntered) return setData({...data, filteredData:null, isTextEntered:false})

    if (!filteredData[0] && isTextEntered) return setData({ ...data, filteredData: null, isTextEntered:true })

    const clone = {}
    const flagsPerPage = filteredData.length > 10 ? 10 : filteredData.length
    let page = 1
    for (let i = 0; i <= filteredData.length - flagsPerPage; i + flagsPerPage) {
      clone[page] = filteredData.splice(i, flagsPerPage)
      page ++
    }
    
    setData({ ...data, filteredData: {...clone}, isTextEntered:true })

  }

  if (!data) return <Loading />
  return (
    <Container maxWidth='xl'>
      <Typography variant='h1' component='h1'>Create Game</Typography>
      <Typography variant='h5' component='h5'>Please choose the flag you want to play with</Typography>
      <GameSection
        users={data.customized}
        filteredFlags={data.filteredData}
        allFlags={Object.values(data.customized).reduce((acc, cur) => acc.concat(cur), [])}
        setFilteredFlags={(data, boolean) => setFilteredFlags(data, boolean)}
        isTextEntered={data.isTextEntered}
      />
    </Container>
  )
}
