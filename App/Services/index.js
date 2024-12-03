import { request, gql } from 'graphql-request'
//Replace This Complete Master Key
// const MASTER_URL="https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cm33atqin07hl07w5l4g4ldy1/master";
const MASTER_URL="https://eu-west-2.cdn.hygraph.com/content/cm33atqin07hl07w5l4g4ldy1/master";

export const getCourseList=async(level)=>{
    const query=gql`
query CourseList {
  courses {
    id
    banner {
      url
    }
    name
    description {
      text
    }
    chapters {
      id
      content {
        heading
        description {
          markdown
          html
        }
      }
      title
    }
    hours {
      text
    }
  }
}`;
  
    const result=await request(MASTER_URL,query);
    return result;

}


export const enrollCourse=async(courseId,userEmail)=>{
  const mutationQuery=gql`
  mutation MyMutation {
    createUserEnrolledCourse(
      data: {courseId: "`+courseId+`", 
      userEmail: "`+userEmail+`", course: {connect: {id: "`+courseId+`"}}}
    ) {
      id
    }
    publishManyUserEnrolledCoursesConnection(to: PUBLISHED) {
      edges {
        node {
          id
        }
      }
    }
  }
  `

  const result=await request(MASTER_URL,mutationQuery);
    return result;
}

export const getUserEnrolledCourse=async(courseId,userEmail)=>{
  const query=gql`
  query GetUserEnrolledCourse {
    userEnrolledCourses(
      where: {courseId: "`+courseId+`", 
        userEmail: "`+userEmail+`"}
    ) {
      id
      courseId
      completedChapter {
        chapterId
      }
    }
  }
  `
  const result=await request(MASTER_URL,query);
  return result;
}


export const MarkChapterCompleted=async(chapterId,recordId,userEmail)=>{
  const mutationQuery=gql`
  mutation markChapterCompleted {
    updateUserEnrolledCourse(
      data: {completedChapter: {create: {data: {chapterId: "`+chapterId+`"}}}}
      where: {id: "`+recordId+`"}
    ) {
      id
    }
    publishManyUserEnrolledCoursesConnection {
      edges {
        node {
          id
        }
      }
    }
    

      publishUserDetail(where: {email: "`+userEmail+`"}) {
        id
      }
    
    
  }
  `

  const result=await request(MASTER_URL,mutationQuery);
  return result; 
}

// ini dimodif point nya diilangin
export const createNewUser=async(userName,email,profileImageUrl)=>{
  const mutationQuery=gql`
  mutation CreateNewUser {
    upsertUserDetail(
      upsert: {create: 
        {email: "`+email+`", 
        point: 10, 
        profileImage: "`+profileImageUrl+`", 
        userName: "`+userName+`"}, 
        update: {email: "`+email+`", 
         profileImage: 
         "`+profileImageUrl+`", userName: "`+userName+`"}}
      where: {email: "`+email+`"}
    ) {
      id
    }
    publishUserDetail(where: {email: "`+email+`"}) {
      id
    }
  }
  
  `
  const result=await request(MASTER_URL,mutationQuery);
  return result; 
}

export const getUserDetail=async(email)=>{
  const query=gql`
  query getUserDetails {
    userDetail(where: 
      {email: "`+email+`"}) {
      point
    }
  }
  `
  const result=await request(MASTER_URL,query);
  return result;
}

export const GetAllUsers=async()=>{
  const query=gql`
  query GetAllUsers {
    userDetails(orderBy: point_DESC) {
      id
      profileImage
      userName
      point
    }
  }
  `
  const result=await request(MASTER_URL,query);
  return result;
}

export const GetAllProgressCourse=async(userEmail)=>{
  const query=gql`
  query GetAllUserEnrolledProgressCourse {
    userEnrolledCourses(where: {userEmail: "`+userEmail+`"}) {
      completedChapter {
        chapterId
      }
      course {
        banner {
          url
        }
        chapters {
          id
          title
          content {
            heading
            description {
              markdown
              html
            }
            output {
              markdown
              html
            }
          }
        }
        description {
          text
        }
        id
        level
        name
        hours {
          text}
      }
    }
  }
  `

  const result=await request(MASTER_URL,query);
  return result;
}