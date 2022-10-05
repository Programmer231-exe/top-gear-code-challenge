import axios from 'axios';
import { Project } from './geo_app_types';
import { ProjectGlobalState } from './state';

export async function getProjects(username: string, state: any, callback: Function) {
  setTimeout(() => {
    axios.get(`http://localhost:4000/projects`).then(resp => {
      console.log("making api calls");
      let data: [Project] = resp.data;
      let searchCount = getQuote(localStorage.getItem("username"))
      console.log("Making api calls");
      callback({
        ...state,
        loading: false,
        projects: localStorage.getItem("username") === "sivasankar" ? data : [],
        selectedProject: localStorage.getItem("username") === "sivasankar" ? state.selectedProject : "",
        quote: {
          searchCount: searchCount
        },
        user: {
          user_id: "username",
          first_name: "first name",
          last_name: "last_name",
          email_address: "email_address"
        }
      });
    }).catch(err => {
      callback("Update Data")
    }).then(resp => {

    });
  }, 5000);
}

function getQuote(username: string) {
  if (username === "sivasankar") {
    return 7;
  } else {
    return 0;
  }
}

export async function filterProjects(search: string, state: any, callback: Function) {
  setTimeout(() => {
    axios.get('http://localhost:4000/projects').then(resp => {
      let data: [Project] = resp.data;
      callback({
        ...state,
        projects: data
      });
    }).catch(err => {
      callback("Update Data")
    }).then(resp => {

    });
  }, 3000);
}

export async function orderProjects(condition: string, state: any, callback: Function) {
  setTimeout(() => {
    axios.get('http://localhost:4000/projects').then(resp => {
      let data: [Project] = resp.data;
      callback({
        ...state,
        projects: data
      });
    }).catch(err => {
      callback("Update Data")
    }).then(resp => {

    });
  }, 3000);
}


export async function deleteProject() {
  setTimeout(() => {
    axios.delete('http://localhost:4000/users-data').then(resp => {
      console.log(resp);
    }).catch(err => {

    }).then(resp => {

    });
  }, 3000);
}


export async function renameProject() {
  setTimeout(() => {
    axios.put('http://localhost:4000/users-data').then(resp => {
      console.log(resp);
    }).catch(err => {

    }).then(resp => {

    });
  }, 3000);
}


export async function getProjectDetails(state: ProjectGlobalState, callback: Function) {
  setTimeout(() => {
    axios.get(`http://localhost:4000/project-details/project`).then(resp => {
      let data = resp.data;
      const { project, last_updated_on, devices, events, description } = resp.data;
      callback({
        ...state,
        projectDetails: {
          ...state.projectDetails,
          project,
          last_updated_on,
          devices,
          events,
          description
        }
      })
    }

    ).catch(err => console.log(err))
      .then(resp => console.log(resp));
  })
}

export async function callMapAPI(state: ProjectGlobalState, callback: Function) {
  axios.get("http://localhost:4000/map-response").then(
    resp => {
      let data = resp.data;
      console.log("hip", data.circleCoordinates[0].coordinates[0]);
      callback({
        ...state,
        mapData: {
          ...state.mapData,
          circleCoordinates: [...data.circleCoordinates.map((e: any) => ({ radius: e.radius, coordinate: e.coordinates }))]
        }
      })

    }
  ).catch(err => console.log(err))
    .then(resp => console.log(resp));
}
