import { post } from "./documents/post"
import { pageIntro } from "./documents/pageIntro"
import { project } from "./documents/project"
import { navItem } from "./objects/navItem"
import { seo } from "./objects/seo"
import { socialLink } from "./objects/socialLink"
import { homePage } from "./singletons/homePage"
import { siteSettings } from "./singletons/siteSettings"

export const schemaTypes = [
  seo,
  socialLink,
  navItem,
  siteSettings,
  homePage,
  project,
  post,
  pageIntro,
]
