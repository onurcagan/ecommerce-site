import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Skeleton,
  Stack,
  StackProps,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { Rating } from './Rating'
import { FavouriteButton } from './FavouriteButton'
import { PriceTag } from './PriceTag'
import { Product } from '../../types/fakeApiTypes'
import { useCartContext } from '../../../context/cartContext'
import { goToPageOutsideOfNavbar } from '../../helpers/routeFunction'
import { useFavorite } from '../../../context/favoritesContext'
import { isFavorite } from '../../helpers/isFavorite'
import { useState } from 'react'

interface Props {
  product: Product
  rootProps?: StackProps
}

export const ProductCard = (props: Props) => {
  const { product, rootProps } = props
  const { title, image, price, rating } = product
  const { addToCart } = useCartContext()
  const { state, dispatch } = useFavorite()
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <Flex
      spacing={useBreakpointValue({ base: '4', md: '5' })}
      p='1rem'
      {...rootProps}
      h='400px'
      w='320px'
      flexDir={'column'}
    >
      <Box position='relative'>
        <Flex bg='white' rounded={'lg'} justifyContent={'center'} alignContent='center'>
          <Skeleton w='18rem' h='12rem' isLoaded={isLoaded} fadeDuration={1} mx='auto'>
            <Image
              mx='auto'
              objectFit={'contain'}
              w='16rem'
              h='12rem'
              py='0.25rem'
              src={image}
              alt={title}
              draggable='false'
              borderRadius={useBreakpointValue({ base: 'md', md: 'xl' })}
              onLoad={() => setIsLoaded(true)}
              onClick={() => goToPageOutsideOfNavbar(`product/${product.id}`)}
              _hover={{ cursor: 'pointer', userSelect: 'none' }}
            />
          </Skeleton>
        </Flex>
        <FavouriteButton
          position='absolute'
          bg={isFavorite(state, product) ? 'darkorange' : 'white'}
          top='4'
          right='6'
          aria-label={`Add ${title} to your favourites`}
          onClick={() => dispatch({ type: 'addOrRemove', id: product.id })}
        />
      </Box>
      <Stack spacing='1' my='auto'>
        <Tooltip hasArrow label={title} placement='bottom'>
          <Text
            fontWeight='medium'
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            noOfLines={[2]}
            onClick={() => goToPageOutsideOfNavbar(`product/${product.id}`)}
            _hover={{ cursor: 'pointer', userSelect: 'none' }}
          >
            {title}
          </Text>
        </Tooltip>
      </Stack>
      <PriceTag price={price} currency='USD' />
      <Stack>
        <HStack>
          <Rating defaultValue={rating.rate} size='sm' />
          <Text
            fontSize='sm'
            fontWeight={'normal'}
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            {rating.count} Reviews
          </Text>
        </HStack>
      </Stack>
      <Stack align='center' mt='.5rem'>
        <Button
          colorScheme={'orange'}
          width='full'
          onClick={() => {
            addToCart(product.id, 1)
          }}
        >
          Add to cart
        </Button>
        <Button
          textDecoration='underline'
          fontWeight='medium'
          color={useColorModeValue('gray.600', 'gray.400')}
          variant='link'
          onClick={() => {
            addToCart(product.id, 1)
            goToPageOutsideOfNavbar('shopping-cart')
          }}
        >
          Quick shop
        </Button>
      </Stack>
    </Flex>
  )
}
