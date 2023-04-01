import React,{useContext} from 'react'
import { useQuery, gql } from '@apollo/client';
import { Grid, Image } from 'semantic-ui-react'
import { AuthContext } from '../Context/Auth';

import Postcard from '../components/Postcard';
import AddPost from '../components/AddPost';
import { FETCHPOSTS } from '../GraphQl/Queries';



function Home() {
  const {user} = useContext(AuthContext)
  const { loading, error, data } = useQuery(FETCHPOSTS);
 if(error){
  return (
    <h2>{error}</h2>
  )
 }
 
 if(loading || data){
   return (
    <div style={{marginTop:'10px'}}>
      { user && (
      <div className=' center styleAddPost'>
       <AddPost />
      </div>
      )
      }
     <Grid centered columns={2} >
    
     {
       loading?<h3>loading...</h3>:(data.Posts && <Postcard posts={data.Posts} />)
     }
     </Grid>
    </div>
   )
 }
}


export default Home