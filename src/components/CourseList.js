import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import * as contentful from 'contentful'

import Course from '../components/Course'

// from contentful readCourses1 API key
const SPACE_ID = 'iy67nzslxklr'
const ACCESS_TOKEN = 'npNDxi9Cc3j4Deixer_SIaRlN5H-DETSX6R1uPTZiUE'

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
})

class CourseList extends Component {
state = {
  courses: [],
  searchString: ''
}

// this part is necessary to see the cards
// why?
// The constructor for a React component... 
// is called before it is mounted
constructor() {
  super()
  this.getCourses()
}

getCourses = () => {
  client.getEntries({
    content_type: 'course',
    query: this.state.searchString
  })
  .then((response) => {
    this.setState({courses: response.items})
  })
  .catch((error) => {
    console.log('Error occured when fetching data')
    console.log(error)
  })
}
// callback for initiate freetext searches...
onSearchInputChange = (event) => {
  if (event.target.value) {
    this.setState({searchString: event.target.value})
  } else {
    this.setState({searchString: ''})
  }
  this.getCourses()
}

  render() {
    return (
      <div>
        {this.state.courses ? (
          <div>
            <TextField style={{padding: 24}}
              id="searchInput"
              placeholder="Search for courses"
              margin="normal"
              onChange={this.onSearchInputChange}
            />
            <Grid container spacing={10} style={{padding: 24}}>
              {this.state.courses.map(currentCourse => (
                // xs » applied for extra small screen sizes
                // material-ui...
                <Grid item xs={12} sm={6} lg={4} xl={3} key={currentCourse.fields.title}>
                  <Course course={currentCourse} />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : 'No courses found' }
      </div>
    )
  }
}

export default CourseList