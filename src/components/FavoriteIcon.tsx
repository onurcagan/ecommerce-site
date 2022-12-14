import { Center, CenterProps, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { BsFillCircleFill, BsHeartFill } from 'react-icons/bs'
import { useFavorite } from '../../context/favoritesContext'
import { goToPageOutsideOfNavbar } from '../helpers/routeFunction'

export const FavoriteIcon = (props: CenterProps) => {
  const { state } = useFavorite()
  return (
    <Center
      {...props}
      onClick={() => goToPageOutsideOfNavbar('favorites')}
      _hover={{ cursor: 'pointer', transform: 'scale(1.1)' }}
      transition='all 0.15s ease'
    >
      <Text pos='absolute' pl='25px' pb='25px' zIndex='3' fontSize={'14px'}>
        {state.length - 1}
      </Text>
      <Icon
        as={BsFillCircleFill}
        position='absolute'
        pl='25px'
        pb='25px'
        fontSize={'48px'}
        zIndex={'2'}
        color='#E94057'
      />
      <Icon as={BsHeartFill} color='darkorange' fontSize={'2xl'} transition='all 0.15s ease' />
    </Center>
  )
}
