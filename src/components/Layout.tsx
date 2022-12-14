import { Flex, Text, Box } from '@chakra-ui/react'
import Head from 'next/head'
import { Navbar } from './NavBar'
import { OpenGraphTags } from './OpenGraphTags'

export default function Layout({
  children,
  title,
}: {
  children?: JSX.Element | JSX.Element[]
  title: string
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <OpenGraphTags />
      </Head>

      <Flex direction='column' h='auto' minH='100vh' bg='gray.50'>
        <Box
          id='navbar'
          as='header'
          // bg='linear-gradient(to top, transparent, #d1d1d1)'
          backgroundColor='rgba(255, 255, 255, .7)'
          color='white'
          p='4'
          w='100%'
          zIndex={'5'}
          position={'sticky'}
          backdropFilter='saturate(180%) blur(15px)'
          top={'0'}
          roundedBottom={'2xl'}
          transition='all .4s ease'
        >
          <Navbar />
        </Box>
        <Box rounded='xl' flex='auto' as='main' p='4' m='4' bgColor='white' shadow={'2xl'}>
          {children}
        </Box>
        <Box
          as='footer'
          bg='linear-gradient(to bottom, transparent, #d1d1d1)'
          textAlign={'center'}
          py={4}
        >
          <Text fontWeight={'600'} color='black'>
            Elise - 2022
          </Text>
        </Box>
      </Flex>
    </>
  )
}
