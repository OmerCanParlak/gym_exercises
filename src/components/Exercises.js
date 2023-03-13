import React ,{useEffect, useState } from 'react'
import Pagination  from '@mui/material/Pagination'
import { Box, Stack , Typography } from '@mui/material'

import { exercisesOptions, fetchData } from '../utils/fetchData'
import ExerciseCard from './ExerciseCard'



const Exercises = ({exercises,setExercises,bodyPart}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const exercisesPerPage = 9;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const İndexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercise = exercises.slice(İndexOfFirstExercise, indexOfLastExercise)

  const paginate = (e,value)=> {
    setCurrentPage(value);
    window.scrollTo({top:1800,behavior:"smooth"})
  }

  useEffect(() => {
    const fecthExercisesData = async () => {
      let exercisesData = [];

      if(bodyPart === "all"){
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exercisesOptions);
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,exercisesOptions);
      }

      setExercises(exercisesData);
    }
  
    fecthExercisesData();
    
  }, [bodyPart])
  


  return (
    <Box id="exercises"
      sx={{mt:{lg:"110px"}}}
      mt="50px"
      p="20px"
    >
      <Typography variant="h4" mb="46px" >
        Showing Results
      </Typography>
      <Stack direction="row" sx={{gap: {lg:"110px", xs:"50px"}}} flexWrap="wrap" justifyContent="center">
          {currentExercise.map((exercise,index) => (
            <ExerciseCard key={index} exercise={exercise} />
            
          ) )}
      </Stack>
      
      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  )
}

export default Exercises