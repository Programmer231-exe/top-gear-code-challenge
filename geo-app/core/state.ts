import { atom } from "recoil";
import { Project } from "./geo_app_types";


export interface DialogueState {
  rename: boolean
  delete: boolean
}

export interface UserData {
  first_name: string,
  last_name: string,
  user_id: string,
  email_address: string
}

export const dialogueState = atom<DialogueState>({
  key: "dialogueState",
  default: {
    rename: false,
    delete: false
  }
})

export interface MenuState {
  anchorEl: HTMLElement | null;
  open: boolean;

}

export const menuState = atom<MenuState>({
  key: "menuState",
  default: {
    anchorEl: null,
    open: false
  }
})

export interface ProjectGlobalState {
  selectedProject: string,
  loading: boolean,
  projects: [Project] | []
  projectDetails: {
    project: Project,
    devices: number,
    events: number,
    selectedProject: string,
    description: string,
    last_updated_on: string
  },
  mapData: {
    circleCoordinates: [{
      coordinate: [number],
      radius: number
    }],
    polygonCoordinates: [{
      coordinates: [[[number, number]]]
    }]
  },
  quote: {
    searchCount: number;
  },
  user: UserData
}
export const projectGlobalState = atom<ProjectGlobalState>({
  key: "projectCentralState",
  default: {
    selectedProject: "",
    loading: true,
    projects: [],
    projectDetails: {
      project: {
        name: "",
        created_at: "",
        thumbnail: ""
      },
      devices: 0,
      events: 0,
      description: "",
      last_updated_on: ""
    },
    mapData: {
      circleCoordinates: [{ radius: 0, coordinate: [0, 0] }],
      polygonCoordinates: [{
        coordinates: [[0, 0], [0, 0]]
      }]

    },
    quote: {
      searchCount: "5"
    }
  }
})
