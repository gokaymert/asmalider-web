import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { aboutType } from './aboutType'
import { boardType } from './boardType'
import { tuzukType } from './tuzukType'
import { membershipType } from './membershipType'
import { workType } from './workType'
import { tarihceType } from './tarihceType'
import { transportationType } from './transportationType'
import { accommodationType } from './accommodationType'
import { galleryType } from './galleryType'
import { pensionType } from './pensionType'
import { marmaraTarihceType } from './marmaraTarihceType'
import { marmaraGunumuzType } from './marmaraGunumuzType'
import { contactType } from './contactType'
import { supportersType } from './supportersType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, aboutType, boardType, tuzukType, membershipType, workType, tarihceType, transportationType, accommodationType, galleryType, pensionType, marmaraTarihceType, marmaraGunumuzType, contactType, supportersType],
}
