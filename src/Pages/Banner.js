import { Container, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div className='banner'>
      <Container className='bannerContent'>
        <div className="tagline">
          <Typography variant='h2' style={{fontWeight:"bold",marginButtom:15,color:"white"}}>
           Crypto Buddy
          </Typography>
<Typography variant="subtitle2" style={{color:'darkgrey',textTransform:'capitalize'}}>
Get all the info regarding your favourite Crypto Currency
</Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  )
}

export default Banner