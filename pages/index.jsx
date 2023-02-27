import { useQuery, dehydrate } from '@tanstack/react-query'
import GameSection from '../components/game/GameSection'
import Loading from '../components/main/Loading'
import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import { queryClient } from "./_app";
import { getFlags } from '../apis'
import { useTitle } from '@/lib'
import { useState } from 'react'
import Head from 'next/head'



export async function getStaticProps() {
  await queryClient.prefetchQuery(['users'], getFlags)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}


export default function Home() {
  
  const [data, setData] = useState(null)

  // appStep2: data fetching and setting it in front-end
  useQuery({
    queryKey: ['flags'],
    queryFn: getFlags,
    refetchOnWindowFocus: false,
    onSettled: (data) => {
      const customizedUsers = data.reduce((acc, cur) => ([...acc, {
        flagName: cur['name']['common'] ?? 'Unknown',
        flagImage: cur['coatOfArms']['svg'] ?? process.env.DEFAULT_FLAG,
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
        isTextEntered: false
      })
    }
  })
  
  // filtering data logic
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
      <Head>
        <title>{ useTitle('Flag Pieces') }</title>
        <meta name="description" content="Fleg Pieces game powered bj Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant='h1' component='h1'>Create Game</Typography>
      <Typography variant='h5' component='h5'>Please choose the flag you want to play with</Typography>
      <GameSection
        allFlags={Object.values(data.customized).reduce((acc, cur) => acc.concat(cur), [])}
        setFilteredFlags={(data, boolean) => setFilteredFlags(data, boolean)}
        isTextEntered={data.isTextEntered}
        filteredFlags={data.filteredData}
        flags={data.customized}
        />
    </Container>
  )
  
}
