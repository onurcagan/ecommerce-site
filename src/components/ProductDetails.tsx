import {
  Flex,
  Text,
  Image,
  Center,
  Button,
  Stack,
  Box,
  SkeletonCircle,
  SkeletonText,
  Skeleton,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useCartContext } from '../../context/cartContext'
import { capitalizeFirstLetter } from '../helpers/capitalizeFirstLetter'
import { goToPageOutsideOfNavbar } from '../helpers/routeFunction'
import { useFetchItemsQuery } from '../hooks/useFetchItemsQuery'
import { Product } from '../types/fakeApiTypes'
import { Rating } from './Product/Rating'
import { ProductCardSkeleton } from './ProductCardSkeleton'
import { PriceTag } from './ShoppingCart/PriceTag'

export const ProductDetails = ({ index }: { index: number }) => {
  const {
    data: products,
    isError,
    error,
  }: { data: Product[] | undefined; isError: boolean; error: any } = useFetchItemsQuery()
  const { addToCart } = useCartContext()
  const [isLoaded, setIsLoaded] = useState(false)

  if (!products) {
    return (
      <Flex
        maxW={{ base: '60%', '2xl': '45%' }}
        minH={'40vw'}
        flexDir='column'
        justifyContent='flex-start'
        alignItems={'center'}
        mx='auto'
        my='1rem'
      >
        <ProductCardSkeleton />
      </Flex>
    )
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const { id: productId, title, image, category, description, price, rating } = products[index]

  return (
    <Flex
      maxW={{ base: '90%', '2xl': '60%' }}
      minH={'40vw'}
      flexDir='column'
      justifyContent='center'
      alignItems={'center'}
      mx='auto'
      my='1rem'
    >
      <Skeleton w='15rem' h='15rem' isLoaded={isLoaded} fadeDuration={1}>
        <Image
          src={image}
          alt={`${title}`}
          mx='auto'
          mb='3rem'
          objectFit={'contain'}
          w='15rem'
          h='15rem'
          onLoad={() => setIsLoaded(true)}
        />
      </Skeleton>
      <Text textAlign={'center'} mt='1.5rem'>
        {title}
      </Text>
      <Text as='b' textAlign={'center'}>
        Category: <Text as='span'>{capitalizeFirstLetter(category)} </Text>
      </Text>
      <Center flexDir='column' gap='.5rem' mt='1.5rem'>
        <Rating defaultValue={rating.rate} size='sm' />
        <PriceTag price={price} currency='USD' />
      </Center>
      <Text mt='2rem' textAlign={'center'} w={{ base: '90%', sm: '70%', lg: '50%', '2xl': '70%' }}>
        {description}
      </Text>
      <Stack align='center' mt='1.5rem'>
        <Button
          colorScheme={'orange'}
          width='full'
          onClick={() => {
            addToCart(productId, 1)
          }}
        >
          Add to cart
        </Button>
        <Button
          textDecoration='underline'
          fontWeight='medium'
          color={'gray.600'}
          variant='link'
          onClick={() => {
            addToCart(productId, 1)
            goToPageOutsideOfNavbar('shopping-cart')
          }}
        >
          Quick shop
        </Button>
      </Stack>
    </Flex>
  )
}
