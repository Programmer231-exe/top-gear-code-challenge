import { HistoryRouterProps, Location, NavigateFunction } from "react-router-dom";

export interface NavigationProps {
  navigate: NavigateFunction
  location: Location
  history?: HistoryRouterProps
}

export enum PATH_NAMES {
  DASHBOARD = "/dashboard",
  SETTINGS = "/settings",
  SEARCH = "/search",
  DEFAULT = "/",
}

export interface Project {
  name: string
  created_at: string,
  thumbnail: string
}

export interface ProjectDetails {
  project: Project
  last_updated_on: string
  description: string
  devices: string
  events: string
}
