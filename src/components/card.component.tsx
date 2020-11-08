import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { ICard } from '../models/card.model'
import { deleteCardById } from '../store/cards/actions'
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri'

export type CardComponentProps = {
  card: ICard,
  editButtonWasClicked: () => void,
}

const CardDiv = styled.div`
width: 340px;
margin: 20px;
padding-bottom: 14px;
background-color: rgb(242, 242, 242);
border-radius: 8px;
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

&:hover .card-buttons, &:active .card-buttons {
  display: block;
}
`

const ImageWrapper = styled.div`
position: relative;
`

const CardButtons = styled.div`
position: absolute;
bottom: 28px;
right: 28px;
display: none;
`

const CardImage = styled.img`
width: 340px;
height: 220px;
border-radius: 8px;
object-fit: cover;
`

const CardTitle = styled.p`
font-size: 20px;
line-height: 22px;
font-weight: 600;
padding: 12px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis; 
`

const CardSubTitle = styled.p`
font-size: 16px;
line-height: 18px;
padding: 6px 12px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis; 
`

const ActionButton = styled.span`
background-color: white;
border-radius: 20px;
margin-left: 20px;
padding: 8px;
width: 22px;
height: 22px;
cursor: pointer;
`


export const Card: React.FC<CardComponentProps> = ({ card, editButtonWasClicked }) => {
  const dispatch = useDispatch()
  let { title, description, imageUrl } = card

  imageUrl = imageUrl || process.env.PUBLIC_URL + '/images/default-card-image.jpg'

  return <CardDiv>
    <ImageWrapper>

      <CardImage src={imageUrl} alt={title} />

      <CardButtons className='card-buttons'>
        <ActionButton onClick={editButtonWasClicked}>
          <RiEdit2Line size={20} />
        </ActionButton>
        <ActionButton onClick={() => dispatch(deleteCardById(card.id as number))}>
          <RiDeleteBinLine size={20} />
        </ActionButton>
      </CardButtons>
    </ImageWrapper>

    <CardTitle>{title}</CardTitle>
    <CardSubTitle>{description}</CardSubTitle>
  </CardDiv>
}
