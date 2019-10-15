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
}

  render() {
    return (
      <Course />
    )
  }
}

export default CourseList