import { Box, Text, Flex, chakra, StatDownArrow } from '@chakra-ui/react'
import { ProductCard } from './Product/ProductCard'
import React, { useRef } from 'react'
import { Product } from '../types/fakeApiTypes'
import { useFetchItemsQuery } from '../hooks/useFetchItemsQuery'
import { isValidMotionProp, motion } from 'framer-motion'
import { ProductCardSkeleton } from './ProductCardSkeleton'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router'
import TextTransition, { presets } from 'react-text-transition'
import { texts } from '../data/texts'
import { useTextIndex } from '../hooks/useTextIndex'
import WelcomeText from './WelcomeText'

function HomePage() {
  const {
    data: products,
    isError,
    error,
  }: { data: Product[] | undefined; isError: boolean; error: any } = useFetchItemsQuery()
  const { user } = useUser()
  const router = useRouter()
  const scrollToRef = useRef<HTMLDivElement>(null)
  const index = useTextIndex()
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: isValidMotionProp,
  })

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Box bg='white' rounded={'xl'} minH='85vh'>
      <Flex
        flexDir={'column'}
        justifyContent={'center'}
        alignItems='center'
        textAlign='center'
        pt='1.5rem'
        mb='5rem'
        h='90vh'
      >
        {/* Welcome username part */}
        {user ? (
          <Text
            fontSize={['3xl', '5xl']}
            fontFamily='ggsansmedium'
            fontWeight='bold'
            zIndex='2'
            bgGradient={'linear(to-br, #8A2387,#E94057,darkorange)'}
            bgClip={'text'}
          >{`Welcome ${user.name}!`}</Text>
        ) : (
          <WelcomeText />
        )}

        <Text zIndex='2' mt='2rem'>
          <Text
            as='span'
            fontSize={['3xl', '5xl']}
            fontFamily='ggsansmedium'
            fontWeight='bold'
            bgGradient={'linear(to-tl, #8A2387,#E94057,darkorange)'}
            bgClip={'text'}
            zIndex='2'
          >
            Your one stop shop
          </Text>
          <Text as='span' color='black' zIndex='2' fontSize={['3xl', '5xl']}>
            .
          </Text>
        </Text>
        <ChakraBox
          display={{ base: 'none', lg: 'flex' }}
          style={{
            background: 'black',
            width: '200px',
            height: '200px',
            zIndex: '1',
            position: 'absolute',
            marginLeft: '393px',
            marginBottom: '60px',
          }}
          animate={{
            scale: [1, 2, 2, 1, 0],
            rotate: [180, 0, 180, 180, 0],
            borderRadius: ['25%', '50%', '0%', '0%', '50%'],
          }}
          // @ts-ignore no problem in operation, although type error appears.
          transition={{
            duration: 2,
            ease: 'easeInOut',
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
        <Text fontSize={['sm', 'md']} color={'#E94057'} zIndex='2' fontWeight={'bold'} mt='3rem'>
          Scroll down to browse our products!
        </Text>
        <Text mt='3rem' as='i' fontWeight={'bold'} color='#E94057'>
          click me!
        </Text>
        <StatDownArrow
          mt='-.5rem'
          color={'#E94057'}
          zIndex='2'
          fontWeight={'bold'}
          fontSize='6xl'
          onClick={() => {
            const navbar = document.getElementById('navbar')!
            navbar.style.opacity = '0'
            navbar.style.visibility = 'hidden'
            scrollToRef.current?.scrollIntoView()
          }}
          _hover={{ cursor: 'pointer' }}
        />
      </Flex>

      <Flex
        mx='auto'
        maxW={{ base: '100%', '2xl': '75%' }}
        wrap={'wrap'}
        gap='2rem'
        justifyContent={'center'}
        flexGrow='100%'
        id='products'
        ref={scrollToRef}
      >
        {products ? (
          products.map((p: Product) => <ProductCard key={p.id} product={p} />)
        ) : (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        )}
      </Flex>
    </Box>
  )
}

export { HomePage }
