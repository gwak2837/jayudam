import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Any: any
  DateTime: string
  EmailAddress: string
  JWT: string
  Latitude: any
  Longitude: any
  NonEmptyString: string
  NonNegativeInt: number
  PositiveInt: number
  URL: string
  UUID: string
}

export type Cert = {
  __typename?: 'Cert'
  content?: Maybe<Scalars['String']>
  effectiveDate?: Maybe<Scalars['DateTime']>
  id: Scalars['ID']
  issueDate?: Maybe<Scalars['DateTime']>
  location?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  type: CertType
}

export type CertAgreement = {
  __typename?: 'CertAgreement'
  immunizationSince?: Maybe<Scalars['DateTime']>
  sexualCrimeSince?: Maybe<Scalars['DateTime']>
  showBirthdate: Scalars['Boolean']
  showImmunization: Scalars['Boolean']
  showLegalName: Scalars['Boolean']
  showSTDTest: Scalars['Boolean']
  showSex: Scalars['Boolean']
  showSexualCrime: Scalars['Boolean']
  stdTestSince?: Maybe<Scalars['DateTime']>
}

export type CertAgreementInput = {
  immunizationSince?: InputMaybe<Scalars['DateTime']>
  sexualCrimeSince?: InputMaybe<Scalars['DateTime']>
  showBirthdate?: InputMaybe<Scalars['Boolean']>
  showImmunization?: InputMaybe<Scalars['Boolean']>
  showLegalName?: InputMaybe<Scalars['Boolean']>
  showSTDTest?: InputMaybe<Scalars['Boolean']>
  showSex?: InputMaybe<Scalars['Boolean']>
  showSexualCrime?: InputMaybe<Scalars['Boolean']>
  stdTestSince?: InputMaybe<Scalars['DateTime']>
}

export type CertCreation = {
  birthdate: Scalars['DateTime']
  issueDate: Scalars['DateTime']
  legalName: Scalars['NonEmptyString']
  sex: Sex
  verificationCode: Scalars['NonEmptyString']
}

export enum CertType {
  ClinicalLaboratoryTest = 'CLINICAL_LABORATORY_TEST',
  Immunization = 'IMMUNIZATION',
  SexualCrime = 'SEXUAL_CRIME',
  StdTest = 'STD_TEST',
}

export type Certs = {
  __typename?: 'Certs'
  birthdate?: Maybe<Scalars['DateTime']>
  creationTime: Scalars['DateTime']
  id: Scalars['ID']
  immunizationCerts?: Maybe<Array<Cert>>
  legalName?: Maybe<Scalars['String']>
  sex?: Maybe<Sex>
  sexualCrimeCerts?: Maybe<Array<Cert>>
  stdTestCerts?: Maybe<Array<Cert>>
}

export enum Grade {
  Enterprise = 'ENTERPRISE',
  Free = 'FREE',
  Pro = 'PRO',
}

export type Mutation = {
  __typename?: 'Mutation'
  certJWT: Scalars['JWT']
  createPost?: Maybe<PostCreationResult>
  deletePost?: Maybe<Post>
  deleteSharingPost?: Maybe<PostDeletionResult>
  disconnectFromGoogleOAuth?: Maybe<Scalars['Boolean']>
  disconnectFromKakaoOAuth?: Maybe<Scalars['Boolean']>
  disconnectFromNaverOAuth?: Maybe<Scalars['Boolean']>
  logout?: Maybe<User>
  submitCert?: Maybe<Cert>
  takeAttendance?: Maybe<User>
  toggleLikingPost?: Maybe<Post>
  unregister?: Maybe<User>
  updateMyCertAgreement?: Maybe<CertAgreement>
  updatePost?: Maybe<Post>
  updateUser?: Maybe<User>
  verifyCertJWT?: Maybe<Certs>
  verifyTown?: Maybe<User>
  wakeUser?: Maybe<User>
}

export type MutationCertJwtArgs = {
  input: CertAgreementInput
}

export type MutationCreatePostArgs = {
  input: PostCreationInput
}

export type MutationDeletePostArgs = {
  id: Scalars['ID']
}

export type MutationDeleteSharingPostArgs = {
  sharedPostId: Scalars['ID']
}

export type MutationSubmitCertArgs = {
  input: CertCreation
}

export type MutationToggleLikingPostArgs = {
  id: Scalars['ID']
}

export type MutationUpdateMyCertAgreementArgs = {
  input?: InputMaybe<CertAgreementInput>
}

export type MutationUpdatePostArgs = {
  input: PostUpdateInput
}

export type MutationUpdateUserArgs = {
  input: UserUpdate
}

export type MutationVerifyCertJwtArgs = {
  jwt: Scalars['JWT']
}

export type MutationVerifyTownArgs = {
  lat: Scalars['Latitude']
  lon: Scalars['Longitude']
}

export enum OAuthProvider {
  Google = 'GOOGLE',
  Kakao = 'KAKAO',
  Naver = 'NAVER',
}

/** 기본값: 내림차순 */
export enum OrderDirection {
  Asc = 'ASC',
}

export type Pagination = {
  lastId?: InputMaybe<Scalars['ID']>
  lastValue?: InputMaybe<Scalars['Any']>
  limit: Scalars['PositiveInt']
}

export type Post = {
  __typename?: 'Post'
  author?: Maybe<User>
  commentCount?: Maybe<Scalars['Int']>
  comments?: Maybe<Array<Post>>
  content?: Maybe<Scalars['String']>
  creationTime?: Maybe<Scalars['DateTime']>
  deletionTime?: Maybe<Scalars['DateTime']>
  doIComment: Scalars['Boolean']
  doIShare: Scalars['Boolean']
  id: Scalars['ID']
  imageUrls?: Maybe<Array<Scalars['URL']>>
  isLiked: Scalars['Boolean']
  likeCount?: Maybe<Scalars['Int']>
  parentPost?: Maybe<Post>
  sharedCount?: Maybe<Scalars['Int']>
  sharingPost?: Maybe<Post>
  updateTime?: Maybe<Scalars['DateTime']>
}

export type PostCreationInput = {
  content?: InputMaybe<Scalars['String']>
  imageUrls?: InputMaybe<Array<Scalars['URL']>>
  parentPostId?: InputMaybe<Scalars['ID']>
  sharingPostId?: InputMaybe<Scalars['ID']>
}

export type PostCreationResult = {
  __typename?: 'PostCreationResult'
  newPost: Post
  parentPost?: Maybe<Post>
  sharedPost?: Maybe<Post>
}

export type PostDeletionResult = {
  __typename?: 'PostDeletionResult'
  deletedPost?: Maybe<Post>
  sharedPost?: Maybe<Post>
}

export type PostUpdateInput = {
  content: Scalars['NonEmptyString']
  id: Scalars['ID']
  imageUrls?: InputMaybe<Array<Scalars['URL']>>
}

export type Query = {
  __typename?: 'Query'
  auth?: Maybe<User>
  certs?: Maybe<Certs>
  comments?: Maybe<Array<Post>>
  hello: Scalars['String']
  isUniqueUsername: Scalars['Boolean']
  myCertAgreement?: Maybe<User>
  myProfile?: Maybe<User>
  pendingCerts?: Maybe<Array<Cert>>
  post?: Maybe<Post>
  posts?: Maybe<Array<Post>>
  sampleCertJWT: Scalars['JWT']
  user?: Maybe<User>
  verificationHistories?: Maybe<Array<Certs>>
}

export type QueryCommentsArgs = {
  lastId?: InputMaybe<Scalars['ID']>
  limit?: InputMaybe<Scalars['PositiveInt']>
  parentId: Scalars['ID']
}

export type QueryHelloArgs = {
  name: Scalars['String']
}

export type QueryIsUniqueUsernameArgs = {
  username: Scalars['NonEmptyString']
}

export type QueryPostArgs = {
  id: Scalars['ID']
}

export type QueryPostsArgs = {
  lastId?: InputMaybe<Scalars['ID']>
  limit?: InputMaybe<Scalars['PositiveInt']>
}

export type QueryUserArgs = {
  name?: InputMaybe<Scalars['NonEmptyString']>
}

export type ServiceAgreement = {
  __typename?: 'ServiceAgreement'
  adAgreement: Scalars['Boolean']
  adAgreementTime?: Maybe<Scalars['DateTime']>
  locationAgreement: Scalars['Boolean']
  locationAgreementTime?: Maybe<Scalars['DateTime']>
  personalDataStoringYear: Scalars['Int']
  privacyAgreement: Scalars['Boolean']
  privacyAgreementTime?: Maybe<Scalars['DateTime']>
  termsAgreement: Scalars['Boolean']
  termsAgreementTime?: Maybe<Scalars['DateTime']>
}

export type ServiceAgreementInput = {
  adAgreement?: InputMaybe<Scalars['Boolean']>
  locationAgreement?: InputMaybe<Scalars['Boolean']>
  personalDataStoringYear?: InputMaybe<Scalars['NonNegativeInt']>
  privacyAgreement?: InputMaybe<Scalars['Boolean']>
  termsAgreement?: InputMaybe<Scalars['Boolean']>
}

export enum Sex {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER',
  Unknown = 'UNKNOWN',
}

export type Town = {
  __typename?: 'Town'
  count: Scalars['Int']
  name?: Maybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  bio?: Maybe<Scalars['String']>
  birthday?: Maybe<Scalars['String']>
  birthyear?: Maybe<Scalars['Int']>
  blockingEndTime?: Maybe<Scalars['DateTime']>
  blockingStartTime?: Maybe<Scalars['DateTime']>
  certAgreement?: Maybe<CertAgreement>
  cherry?: Maybe<Scalars['Int']>
  coverImageUrls?: Maybe<Array<Scalars['String']>>
  creationTime?: Maybe<Scalars['DateTime']>
  email?: Maybe<Scalars['String']>
  followerCount?: Maybe<Scalars['String']>
  followingCount?: Maybe<Scalars['String']>
  grade?: Maybe<Grade>
  id: Scalars['UUID']
  imageUrl?: Maybe<Scalars['String']>
  imageUrls?: Maybe<Array<Scalars['String']>>
  isPrivate?: Maybe<Scalars['Boolean']>
  isSleeping?: Maybe<Scalars['Boolean']>
  isVerifiedBirthday?: Maybe<Scalars['Boolean']>
  isVerifiedBirthyear?: Maybe<Scalars['Boolean']>
  isVerifiedEmail?: Maybe<Scalars['Boolean']>
  isVerifiedName?: Maybe<Scalars['Boolean']>
  isVerifiedPhoneNumber?: Maybe<Scalars['Boolean']>
  isVerifiedSex?: Maybe<Scalars['Boolean']>
  legalName?: Maybe<Scalars['String']>
  logoutTime?: Maybe<Scalars['DateTime']>
  name?: Maybe<Scalars['String']>
  nickname?: Maybe<Scalars['String']>
  oAuthProviders?: Maybe<Array<OAuthProvider>>
  postCount?: Maybe<Scalars['String']>
  serviceAgreement?: Maybe<ServiceAgreement>
  sex?: Maybe<Sex>
  sleepingTime?: Maybe<Scalars['DateTime']>
  towns?: Maybe<Array<Town>>
}

export type UserUpdate = {
  bio?: InputMaybe<Scalars['NonEmptyString']>
  certAgreement?: InputMaybe<CertAgreementInput>
  email?: InputMaybe<Scalars['EmailAddress']>
  imageUrls?: InputMaybe<Array<Scalars['URL']>>
  name?: InputMaybe<Scalars['NonEmptyString']>
  nickname?: InputMaybe<Scalars['NonEmptyString']>
  serviceAgreement?: InputMaybe<ServiceAgreementInput>
  town1Name?: InputMaybe<Scalars['NonEmptyString']>
  town2Name?: InputMaybe<Scalars['NonEmptyString']>
}

export type CreatePostMutationVariables = Exact<{
  input: PostCreationInput
}>

export type CreatePostMutation = {
  __typename?: 'Mutation'
  createPost?: {
    __typename?: 'PostCreationResult'
    newPost: {
      __typename?: 'Post'
      id: string
      creationTime?: string | null
      updateTime?: string | null
      deletionTime?: string | null
      content?: string | null
      imageUrls?: Array<string> | null
      isLiked: boolean
      doIComment: boolean
      doIShare: boolean
      likeCount?: number | null
      commentCount?: number | null
      sharedCount?: number | null
      author?: { __typename?: 'User'; id: string } | null
      parentPost?: {
        __typename?: 'Post'
        author?: { __typename?: 'User'; id: string; name?: string | null } | null
      } | null
    }
  } | null
}

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeletePostMutation = {
  __typename?: 'Mutation'
  deletePost?: {
    __typename?: 'Post'
    id: string
    deletionTime?: string | null
    content?: string | null
    imageUrls?: Array<string> | null
    sharingPost?: { __typename?: 'Post'; id: string } | null
    parentPost?: { __typename?: 'Post'; id: string } | null
  } | null
}

export type DeleteSharingPostMutationVariables = Exact<{
  sharedPostId: Scalars['ID']
}>

export type DeleteSharingPostMutation = {
  __typename?: 'Mutation'
  deleteSharingPost?: {
    __typename?: 'PostDeletionResult'
    deletedPost?: {
      __typename?: 'Post'
      id: string
      deletionTime?: string | null
      content?: string | null
      imageUrls?: Array<string> | null
      sharingPost?: { __typename?: 'Post'; id: string } | null
      parentPost?: {
        __typename?: 'Post'
        author?: { __typename?: 'User'; id: string; name?: string | null } | null
      } | null
    } | null
    sharedPost?: {
      __typename?: 'Post'
      id: string
      sharedCount?: number | null
      doIShare: boolean
    } | null
  } | null
}

export type SharePostMutationVariables = Exact<{
  input: PostCreationInput
}>

export type SharePostMutation = {
  __typename?: 'Mutation'
  createPost?: {
    __typename?: 'PostCreationResult'
    newPost: {
      __typename?: 'Post'
      id: string
      creationTime?: string | null
      updateTime?: string | null
      deletionTime?: string | null
      content?: string | null
      imageUrls?: Array<string> | null
      isLiked: boolean
      doIComment: boolean
      doIShare: boolean
      likeCount?: number | null
      commentCount?: number | null
      sharedCount?: number | null
      sharingPost?: { __typename?: 'Post'; id: string } | null
      author?: {
        __typename?: 'User'
        id: string
        name?: string | null
        nickname?: string | null
        imageUrl?: string | null
      } | null
      parentPost?: {
        __typename?: 'Post'
        author?: { __typename?: 'User'; id: string; name?: string | null } | null
      } | null
    }
    sharedPost?: {
      __typename?: 'Post'
      id: string
      doIShare: boolean
      sharedCount?: number | null
    } | null
  } | null
}

export type PostCardFragment = {
  __typename?: 'Post'
  id: string
  creationTime?: string | null
  updateTime?: string | null
  deletionTime?: string | null
  content?: string | null
  imageUrls?: Array<string> | null
  isLiked: boolean
  doIComment: boolean
  doIShare: boolean
  likeCount?: number | null
  commentCount?: number | null
  sharedCount?: number | null
  author?: {
    __typename?: 'User'
    id: string
    name?: string | null
    nickname?: string | null
    imageUrl?: string | null
  } | null
  parentPost?: {
    __typename?: 'Post'
    author?: { __typename?: 'User'; id: string; name?: string | null } | null
  } | null
}

export type AuthQueryVariables = Exact<{ [key: string]: never }>

export type AuthQuery = {
  __typename?: 'Query'
  auth?: { __typename?: 'User'; id: string; name?: string | null } | null
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = {
  __typename?: 'Mutation'
  logout?: { __typename?: 'User'; logoutTime?: string | null } | null
}

export type UserQueryVariables = Exact<{
  name?: InputMaybe<Scalars['NonEmptyString']>
}>

export type UserQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: string
    creationTime?: string | null
    bio?: string | null
    birthday?: string | null
    birthyear?: number | null
    blockingStartTime?: string | null
    blockingEndTime?: string | null
    cherry?: number | null
    coverImageUrls?: Array<string> | null
    followerCount?: string | null
    followingCount?: string | null
    grade?: Grade | null
    imageUrls?: Array<string> | null
    isPrivate?: boolean | null
    isSleeping?: boolean | null
    isVerifiedBirthday?: boolean | null
    isVerifiedBirthyear?: boolean | null
    isVerifiedSex?: boolean | null
    name?: string | null
    nickname?: string | null
    postCount?: string | null
    sex?: Sex | null
    sleepingTime?: string | null
    towns?: Array<{ __typename?: 'Town'; count: number; name?: string | null }> | null
  } | null
}

export type MyProfileQueryVariables = Exact<{ [key: string]: never }>

export type MyProfileQuery = {
  __typename?: 'Query'
  myProfile?: { __typename?: 'User'; id: string; imageUrl?: string | null } | null
}

export type PostsQueryVariables = Exact<{
  lastId?: InputMaybe<Scalars['ID']>
}>

export type PostsQuery = {
  __typename?: 'Query'
  posts?: Array<{
    __typename?: 'Post'
    id: string
    creationTime?: string | null
    updateTime?: string | null
    deletionTime?: string | null
    content?: string | null
    imageUrls?: Array<string> | null
    isLiked: boolean
    doIComment: boolean
    doIShare: boolean
    likeCount?: number | null
    commentCount?: number | null
    sharedCount?: number | null
    sharingPost?: {
      __typename?: 'Post'
      id: string
      creationTime?: string | null
      updateTime?: string | null
      deletionTime?: string | null
      content?: string | null
      imageUrls?: Array<string> | null
      author?: {
        __typename?: 'User'
        id: string
        name?: string | null
        nickname?: string | null
        imageUrl?: string | null
      } | null
    } | null
    author?: {
      __typename?: 'User'
      id: string
      name?: string | null
      nickname?: string | null
      imageUrl?: string | null
    } | null
    parentPost?: {
      __typename?: 'Post'
      author?: { __typename?: 'User'; id: string; name?: string | null } | null
    } | null
  }> | null
}

export type CommentsQueryVariables = Exact<{
  parentId: Scalars['ID']
  lastId?: InputMaybe<Scalars['ID']>
  limit?: InputMaybe<Scalars['PositiveInt']>
}>

export type CommentsQuery = {
  __typename?: 'Query'
  comments?: Array<{
    __typename?: 'Post'
    id: string
    creationTime?: string | null
    updateTime?: string | null
    deletionTime?: string | null
    content?: string | null
    imageUrls?: Array<string> | null
    isLiked: boolean
    doIComment: boolean
    doIShare: boolean
    likeCount?: number | null
    commentCount?: number | null
    sharedCount?: number | null
    comments?: Array<{
      __typename?: 'Post'
      id: string
      creationTime?: string | null
      updateTime?: string | null
      deletionTime?: string | null
      content?: string | null
      imageUrls?: Array<string> | null
      isLiked: boolean
      doIComment: boolean
      doIShare: boolean
      likeCount?: number | null
      commentCount?: number | null
      sharedCount?: number | null
      author?: {
        __typename?: 'User'
        id: string
        name?: string | null
        nickname?: string | null
        imageUrl?: string | null
      } | null
      parentPost?: {
        __typename?: 'Post'
        author?: { __typename?: 'User'; id: string; name?: string | null } | null
      } | null
    }> | null
    author?: {
      __typename?: 'User'
      id: string
      name?: string | null
      nickname?: string | null
      imageUrl?: string | null
    } | null
    parentPost?: {
      __typename?: 'Post'
      author?: { __typename?: 'User'; id: string; name?: string | null } | null
    } | null
  }> | null
}

export type CreateCommentMutationVariables = Exact<{
  input: PostCreationInput
}>

export type CreateCommentMutation = {
  __typename?: 'Mutation'
  createPost?: {
    __typename?: 'PostCreationResult'
    newPost: {
      __typename?: 'Post'
      id: string
      creationTime?: string | null
      updateTime?: string | null
      deletionTime?: string | null
      content?: string | null
      imageUrls?: Array<string> | null
      isLiked: boolean
      doIComment: boolean
      doIShare: boolean
      likeCount?: number | null
      commentCount?: number | null
      sharedCount?: number | null
      author?: { __typename?: 'User'; id: string } | null
      parentPost?: {
        __typename?: 'Post'
        author?: { __typename?: 'User'; id: string; name?: string | null } | null
      } | null
      comments?: Array<{ __typename?: 'Post'; id: string }> | null
    }
    parentPost?: {
      __typename?: 'Post'
      id: string
      doIComment: boolean
      commentCount?: number | null
    } | null
  } | null
}

export type PostQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type PostQuery = {
  __typename?: 'Query'
  post?: {
    __typename?: 'Post'
    id: string
    creationTime?: string | null
    updateTime?: string | null
    deletionTime?: string | null
    content?: string | null
    imageUrls?: Array<string> | null
    isLiked: boolean
    doIComment: boolean
    doIShare: boolean
    likeCount?: number | null
    commentCount?: number | null
    sharedCount?: number | null
    author?: {
      __typename?: 'User'
      id: string
      name?: string | null
      nickname?: string | null
      imageUrl?: string | null
    } | null
    parentPost?: {
      __typename?: 'Post'
      id: string
      creationTime?: string | null
      updateTime?: string | null
      deletionTime?: string | null
      content?: string | null
      imageUrls?: Array<string> | null
      author?: {
        __typename?: 'User'
        id: string
        name?: string | null
        nickname?: string | null
        imageUrl?: string | null
      } | null
    } | null
    sharingPost?: {
      __typename?: 'Post'
      id: string
      creationTime?: string | null
      updateTime?: string | null
      deletionTime?: string | null
      content?: string | null
      imageUrls?: Array<string> | null
      author?: {
        __typename?: 'User'
        id: string
        name?: string | null
        nickname?: string | null
        imageUrl?: string | null
      } | null
    } | null
  } | null
}

export type ToggleLikingPostMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type ToggleLikingPostMutation = {
  __typename?: 'Mutation'
  toggleLikingPost?: {
    __typename?: 'Post'
    id: string
    isLiked: boolean
    likeCount?: number | null
  } | null
}

export type CertJwtMutationVariables = Exact<{
  input: CertAgreementInput
}>

export type CertJwtMutation = { __typename?: 'Mutation'; certJWT: string }

export type MyCertAgreementQueryVariables = Exact<{ [key: string]: never }>

export type MyCertAgreementQuery = {
  __typename?: 'Query'
  myCertAgreement?: {
    __typename?: 'User'
    id: string
    cherry?: number | null
    certAgreement?: {
      __typename?: 'CertAgreement'
      showBirthdate: boolean
      showLegalName: boolean
      showSex: boolean
      showSTDTest: boolean
      stdTestSince?: string | null
      showImmunization: boolean
      immunizationSince?: string | null
      showSexualCrime: boolean
      sexualCrimeSince?: string | null
    } | null
  } | null
}

export type IsUniqueUsernameQueryVariables = Exact<{
  username: Scalars['NonEmptyString']
}>

export type IsUniqueUsernameQuery = { __typename?: 'Query'; isUniqueUsername: boolean }

export type UpdateUserMutationVariables = Exact<{
  input: UserUpdate
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser?: { __typename?: 'User'; id: string; name?: string | null } | null
}

export type SampleCertJwtQueryVariables = Exact<{ [key: string]: never }>

export type SampleCertJwtQuery = { __typename?: 'Query'; sampleCertJWT: string }

export type VerifyCertJwtMutationVariables = Exact<{
  jwt: Scalars['JWT']
}>

export type VerifyCertJwtMutation = {
  __typename?: 'Mutation'
  verifyCertJWT?: {
    __typename?: 'Certs'
    id: string
    birthdate?: string | null
    legalName?: string | null
    sex?: Sex | null
    stdTestCerts?: Array<{
      __typename?: 'Cert'
      id: string
      content?: string | null
      effectiveDate?: string | null
      issueDate?: string | null
      location?: string | null
      name?: string | null
    }> | null
    immunizationCerts?: Array<{
      __typename?: 'Cert'
      id: string
      content?: string | null
      effectiveDate?: string | null
      issueDate?: string | null
      location?: string | null
      name?: string | null
    }> | null
    sexualCrimeCerts?: Array<{
      __typename?: 'Cert'
      id: string
      content?: string | null
      effectiveDate?: string | null
      issueDate?: string | null
      location?: string | null
      name?: string | null
    }> | null
  } | null
}

export const PostCardFragmentDoc = gql`
  fragment postCard on Post {
    id
    creationTime
    updateTime
    deletionTime
    content
    imageUrls
    isLiked
    doIComment
    doIShare
    likeCount
    commentCount
    sharedCount
    author {
      id
      name
      nickname
      imageUrl
    }
    parentPost {
      author {
        id
        name
      }
    }
  }
`
export const CreatePostDocument = gql`
  mutation CreatePost($input: PostCreationInput!) {
    createPost(input: $input) {
      newPost {
        id
        creationTime
        updateTime
        deletionTime
        content
        imageUrls
        isLiked
        doIComment
        doIShare
        likeCount
        commentCount
        sharedCount
        author {
          id
        }
        parentPost {
          author {
            id
            name
          }
        }
      }
    }
  }
`
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options
  )
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>
export const DeletePostDocument = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
      deletionTime
      content
      imageUrls
      sharingPost {
        id
      }
      parentPost {
        id
      }
    }
  }
`
export type DeletePostMutationFn = Apollo.MutationFunction<
  DeletePostMutation,
  DeletePostMutationVariables
>

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(
  baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument,
    options
  )
}
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<
  DeletePostMutation,
  DeletePostMutationVariables
>
export const DeleteSharingPostDocument = gql`
  mutation DeleteSharingPost($sharedPostId: ID!) {
    deleteSharingPost(sharedPostId: $sharedPostId) {
      deletedPost {
        id
        deletionTime
        content
        imageUrls
        sharingPost {
          id
        }
        parentPost {
          author {
            id
            name
          }
        }
      }
      sharedPost {
        id
        sharedCount
        doIShare
      }
    }
  }
`
export type DeleteSharingPostMutationFn = Apollo.MutationFunction<
  DeleteSharingPostMutation,
  DeleteSharingPostMutationVariables
>

/**
 * __useDeleteSharingPostMutation__
 *
 * To run a mutation, you first call `useDeleteSharingPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSharingPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSharingPostMutation, { data, loading, error }] = useDeleteSharingPostMutation({
 *   variables: {
 *      sharedPostId: // value for 'sharedPostId'
 *   },
 * });
 */
export function useDeleteSharingPostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteSharingPostMutation,
    DeleteSharingPostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteSharingPostMutation, DeleteSharingPostMutationVariables>(
    DeleteSharingPostDocument,
    options
  )
}
export type DeleteSharingPostMutationHookResult = ReturnType<typeof useDeleteSharingPostMutation>
export type DeleteSharingPostMutationResult = Apollo.MutationResult<DeleteSharingPostMutation>
export type DeleteSharingPostMutationOptions = Apollo.BaseMutationOptions<
  DeleteSharingPostMutation,
  DeleteSharingPostMutationVariables
>
export const SharePostDocument = gql`
  mutation SharePost($input: PostCreationInput!) {
    createPost(input: $input) {
      newPost {
        ...postCard
        sharingPost {
          id
        }
      }
      sharedPost {
        id
        doIShare
        sharedCount
      }
    }
  }
  ${PostCardFragmentDoc}
`
export type SharePostMutationFn = Apollo.MutationFunction<
  SharePostMutation,
  SharePostMutationVariables
>

/**
 * __useSharePostMutation__
 *
 * To run a mutation, you first call `useSharePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSharePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sharePostMutation, { data, loading, error }] = useSharePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSharePostMutation(
  baseOptions?: Apollo.MutationHookOptions<SharePostMutation, SharePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SharePostMutation, SharePostMutationVariables>(
    SharePostDocument,
    options
  )
}
export type SharePostMutationHookResult = ReturnType<typeof useSharePostMutation>
export type SharePostMutationResult = Apollo.MutationResult<SharePostMutation>
export type SharePostMutationOptions = Apollo.BaseMutationOptions<
  SharePostMutation,
  SharePostMutationVariables
>
export const AuthDocument = gql`
  query Auth {
    auth {
      id
      name
    }
  }
`

/**
 * __useAuthQuery__
 *
 * To run a query within a React component, call `useAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthQuery(baseOptions?: Apollo.QueryHookOptions<AuthQuery, AuthQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AuthQuery, AuthQueryVariables>(AuthDocument, options)
}
export function useAuthLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AuthQuery, AuthQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AuthQuery, AuthQueryVariables>(AuthDocument, options)
}
export type AuthQueryHookResult = ReturnType<typeof useAuthQuery>
export type AuthLazyQueryHookResult = ReturnType<typeof useAuthLazyQuery>
export type AuthQueryResult = Apollo.QueryResult<AuthQuery, AuthQueryVariables>
export const LogoutDocument = gql`
  mutation Logout {
    logout {
      logoutTime
    }
  }
`
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options)
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const UserDocument = gql`
  query User($name: NonEmptyString) {
    user(name: $name) {
      id
      creationTime
      bio
      birthday
      birthyear
      blockingStartTime
      blockingEndTime
      cherry
      coverImageUrls
      followerCount
      followingCount
      grade
      imageUrls
      isPrivate
      isSleeping
      isVerifiedBirthday
      isVerifiedBirthyear
      isVerifiedSex
      name
      nickname
      postCount
      sex
      sleepingTime
      towns {
        count
        name
      }
    }
  }
`

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options)
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options)
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>
export const MyProfileDocument = gql`
  query MyProfile {
    myProfile {
      id
      imageUrl
    }
  }
`

/**
 * __useMyProfileQuery__
 *
 * To run a query within a React component, call `useMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<MyProfileQuery, MyProfileQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options)
}
export function useMyProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options)
}
export type MyProfileQueryHookResult = ReturnType<typeof useMyProfileQuery>
export type MyProfileLazyQueryHookResult = ReturnType<typeof useMyProfileLazyQuery>
export type MyProfileQueryResult = Apollo.QueryResult<MyProfileQuery, MyProfileQueryVariables>
export const PostsDocument = gql`
  query Posts($lastId: ID) {
    posts(lastId: $lastId) {
      ...postCard
      sharingPost {
        id
        creationTime
        updateTime
        deletionTime
        content
        imageUrls
        author {
          id
          name
          nickname
          imageUrl
        }
      }
    }
  }
  ${PostCardFragmentDoc}
`

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      lastId: // value for 'lastId'
 *   },
 * });
 */
export function usePostsQuery(
  baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options)
}
export function usePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options)
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>
export const CommentsDocument = gql`
  query Comments($parentId: ID!, $lastId: ID, $limit: PositiveInt) {
    comments(parentId: $parentId, lastId: $lastId, limit: $limit) {
      ...postCard
      comments {
        ...postCard
      }
    }
  }
  ${PostCardFragmentDoc}
`

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      parentId: // value for 'parentId'
 *      lastId: // value for 'lastId'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options)
}
export function useCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options)
}
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>
export const CreateCommentDocument = gql`
  mutation CreateComment($input: PostCreationInput!) {
    createPost(input: $input) {
      newPost {
        id
        creationTime
        updateTime
        deletionTime
        content
        imageUrls
        isLiked
        doIComment
        doIShare
        likeCount
        commentCount
        sharedCount
        author {
          id
        }
        parentPost {
          author {
            id
            name
          }
        }
        comments {
          id
        }
      }
      parentPost {
        id
        doIComment
        commentCount
      }
    }
  }
`
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(
    CreateCommentDocument,
    options
  )
}
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>
export const PostDocument = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      creationTime
      updateTime
      deletionTime
      content
      imageUrls
      isLiked
      doIComment
      doIShare
      likeCount
      commentCount
      sharedCount
      author {
        id
        name
        nickname
        imageUrl
      }
      parentPost {
        id
        creationTime
        updateTime
        deletionTime
        content
        imageUrls
        author {
          id
          name
          nickname
          imageUrl
        }
      }
      sharingPost {
        id
        creationTime
        updateTime
        deletionTime
        content
        imageUrls
        author {
          id
          name
          nickname
          imageUrl
        }
      }
    }
  }
`

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options)
}
export function usePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options)
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>
export const ToggleLikingPostDocument = gql`
  mutation ToggleLikingPost($id: ID!) {
    toggleLikingPost(id: $id) {
      id
      isLiked
      likeCount
    }
  }
`
export type ToggleLikingPostMutationFn = Apollo.MutationFunction<
  ToggleLikingPostMutation,
  ToggleLikingPostMutationVariables
>

/**
 * __useToggleLikingPostMutation__
 *
 * To run a mutation, you first call `useToggleLikingPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikingPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikingPostMutation, { data, loading, error }] = useToggleLikingPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleLikingPostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ToggleLikingPostMutation,
    ToggleLikingPostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ToggleLikingPostMutation, ToggleLikingPostMutationVariables>(
    ToggleLikingPostDocument,
    options
  )
}
export type ToggleLikingPostMutationHookResult = ReturnType<typeof useToggleLikingPostMutation>
export type ToggleLikingPostMutationResult = Apollo.MutationResult<ToggleLikingPostMutation>
export type ToggleLikingPostMutationOptions = Apollo.BaseMutationOptions<
  ToggleLikingPostMutation,
  ToggleLikingPostMutationVariables
>
export const CertJwtDocument = gql`
  mutation CertJWT($input: CertAgreementInput!) {
    certJWT(input: $input)
  }
`
export type CertJwtMutationFn = Apollo.MutationFunction<CertJwtMutation, CertJwtMutationVariables>

/**
 * __useCertJwtMutation__
 *
 * To run a mutation, you first call `useCertJwtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCertJwtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [certJwtMutation, { data, loading, error }] = useCertJwtMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCertJwtMutation(
  baseOptions?: Apollo.MutationHookOptions<CertJwtMutation, CertJwtMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CertJwtMutation, CertJwtMutationVariables>(CertJwtDocument, options)
}
export type CertJwtMutationHookResult = ReturnType<typeof useCertJwtMutation>
export type CertJwtMutationResult = Apollo.MutationResult<CertJwtMutation>
export type CertJwtMutationOptions = Apollo.BaseMutationOptions<
  CertJwtMutation,
  CertJwtMutationVariables
>
export const MyCertAgreementDocument = gql`
  query MyCertAgreement {
    myCertAgreement {
      id
      certAgreement {
        showBirthdate
        showLegalName
        showSex
        showSTDTest
        stdTestSince
        showImmunization
        immunizationSince
        showSexualCrime
        sexualCrimeSince
      }
      cherry
    }
  }
`

/**
 * __useMyCertAgreementQuery__
 *
 * To run a query within a React component, call `useMyCertAgreementQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCertAgreementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCertAgreementQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCertAgreementQuery(
  baseOptions?: Apollo.QueryHookOptions<MyCertAgreementQuery, MyCertAgreementQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MyCertAgreementQuery, MyCertAgreementQueryVariables>(
    MyCertAgreementDocument,
    options
  )
}
export function useMyCertAgreementLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyCertAgreementQuery, MyCertAgreementQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MyCertAgreementQuery, MyCertAgreementQueryVariables>(
    MyCertAgreementDocument,
    options
  )
}
export type MyCertAgreementQueryHookResult = ReturnType<typeof useMyCertAgreementQuery>
export type MyCertAgreementLazyQueryHookResult = ReturnType<typeof useMyCertAgreementLazyQuery>
export type MyCertAgreementQueryResult = Apollo.QueryResult<
  MyCertAgreementQuery,
  MyCertAgreementQueryVariables
>
export const IsUniqueUsernameDocument = gql`
  query isUniqueUsername($username: NonEmptyString!) {
    isUniqueUsername(username: $username)
  }
`

/**
 * __useIsUniqueUsernameQuery__
 *
 * To run a query within a React component, call `useIsUniqueUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUniqueUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUniqueUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useIsUniqueUsernameQuery(
  baseOptions: Apollo.QueryHookOptions<IsUniqueUsernameQuery, IsUniqueUsernameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<IsUniqueUsernameQuery, IsUniqueUsernameQueryVariables>(
    IsUniqueUsernameDocument,
    options
  )
}
export function useIsUniqueUsernameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IsUniqueUsernameQuery, IsUniqueUsernameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<IsUniqueUsernameQuery, IsUniqueUsernameQueryVariables>(
    IsUniqueUsernameDocument,
    options
  )
}
export type IsUniqueUsernameQueryHookResult = ReturnType<typeof useIsUniqueUsernameQuery>
export type IsUniqueUsernameLazyQueryHookResult = ReturnType<typeof useIsUniqueUsernameLazyQuery>
export type IsUniqueUsernameQueryResult = Apollo.QueryResult<
  IsUniqueUsernameQuery,
  IsUniqueUsernameQueryVariables
>
export const UpdateUserDocument = gql`
  mutation UpdateUser($input: UserUpdate!) {
    updateUser(input: $input) {
      id
      name
    }
  }
`
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  )
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const SampleCertJwtDocument = gql`
  query SampleCertJWT {
    sampleCertJWT
  }
`

/**
 * __useSampleCertJwtQuery__
 *
 * To run a query within a React component, call `useSampleCertJwtQuery` and pass it any options that fit your needs.
 * When your component renders, `useSampleCertJwtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSampleCertJwtQuery({
 *   variables: {
 *   },
 * });
 */
export function useSampleCertJwtQuery(
  baseOptions?: Apollo.QueryHookOptions<SampleCertJwtQuery, SampleCertJwtQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SampleCertJwtQuery, SampleCertJwtQueryVariables>(
    SampleCertJwtDocument,
    options
  )
}
export function useSampleCertJwtLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SampleCertJwtQuery, SampleCertJwtQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SampleCertJwtQuery, SampleCertJwtQueryVariables>(
    SampleCertJwtDocument,
    options
  )
}
export type SampleCertJwtQueryHookResult = ReturnType<typeof useSampleCertJwtQuery>
export type SampleCertJwtLazyQueryHookResult = ReturnType<typeof useSampleCertJwtLazyQuery>
export type SampleCertJwtQueryResult = Apollo.QueryResult<
  SampleCertJwtQuery,
  SampleCertJwtQueryVariables
>
export const VerifyCertJwtDocument = gql`
  mutation VerifyCertJWT($jwt: JWT!) {
    verifyCertJWT(jwt: $jwt) {
      id
      birthdate
      legalName
      sex
      stdTestCerts {
        id
        content
        effectiveDate
        issueDate
        location
        name
      }
      immunizationCerts {
        id
        content
        effectiveDate
        issueDate
        location
        name
      }
      sexualCrimeCerts {
        id
        content
        effectiveDate
        issueDate
        location
        name
      }
    }
  }
`
export type VerifyCertJwtMutationFn = Apollo.MutationFunction<
  VerifyCertJwtMutation,
  VerifyCertJwtMutationVariables
>

/**
 * __useVerifyCertJwtMutation__
 *
 * To run a mutation, you first call `useVerifyCertJwtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyCertJwtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyCertJwtMutation, { data, loading, error }] = useVerifyCertJwtMutation({
 *   variables: {
 *      jwt: // value for 'jwt'
 *   },
 * });
 */
export function useVerifyCertJwtMutation(
  baseOptions?: Apollo.MutationHookOptions<VerifyCertJwtMutation, VerifyCertJwtMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<VerifyCertJwtMutation, VerifyCertJwtMutationVariables>(
    VerifyCertJwtDocument,
    options
  )
}
export type VerifyCertJwtMutationHookResult = ReturnType<typeof useVerifyCertJwtMutation>
export type VerifyCertJwtMutationResult = Apollo.MutationResult<VerifyCertJwtMutation>
export type VerifyCertJwtMutationOptions = Apollo.BaseMutationOptions<
  VerifyCertJwtMutation,
  VerifyCertJwtMutationVariables
>
export type CertKeySpecifier = (
  | 'content'
  | 'effectiveDate'
  | 'id'
  | 'issueDate'
  | 'location'
  | 'name'
  | 'type'
  | CertKeySpecifier
)[]
export type CertFieldPolicy = {
  content?: FieldPolicy<any> | FieldReadFunction<any>
  effectiveDate?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  issueDate?: FieldPolicy<any> | FieldReadFunction<any>
  location?: FieldPolicy<any> | FieldReadFunction<any>
  name?: FieldPolicy<any> | FieldReadFunction<any>
  type?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertAgreementKeySpecifier = (
  | 'immunizationSince'
  | 'sexualCrimeSince'
  | 'showBirthdate'
  | 'showImmunization'
  | 'showLegalName'
  | 'showSTDTest'
  | 'showSex'
  | 'showSexualCrime'
  | 'stdTestSince'
  | CertAgreementKeySpecifier
)[]
export type CertAgreementFieldPolicy = {
  immunizationSince?: FieldPolicy<any> | FieldReadFunction<any>
  sexualCrimeSince?: FieldPolicy<any> | FieldReadFunction<any>
  showBirthdate?: FieldPolicy<any> | FieldReadFunction<any>
  showImmunization?: FieldPolicy<any> | FieldReadFunction<any>
  showLegalName?: FieldPolicy<any> | FieldReadFunction<any>
  showSTDTest?: FieldPolicy<any> | FieldReadFunction<any>
  showSex?: FieldPolicy<any> | FieldReadFunction<any>
  showSexualCrime?: FieldPolicy<any> | FieldReadFunction<any>
  stdTestSince?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertsKeySpecifier = (
  | 'birthdate'
  | 'creationTime'
  | 'id'
  | 'immunizationCerts'
  | 'legalName'
  | 'sex'
  | 'sexualCrimeCerts'
  | 'stdTestCerts'
  | CertsKeySpecifier
)[]
export type CertsFieldPolicy = {
  birthdate?: FieldPolicy<any> | FieldReadFunction<any>
  creationTime?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  immunizationCerts?: FieldPolicy<any> | FieldReadFunction<any>
  legalName?: FieldPolicy<any> | FieldReadFunction<any>
  sex?: FieldPolicy<any> | FieldReadFunction<any>
  sexualCrimeCerts?: FieldPolicy<any> | FieldReadFunction<any>
  stdTestCerts?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MutationKeySpecifier = (
  | 'certJWT'
  | 'createPost'
  | 'deletePost'
  | 'deleteSharingPost'
  | 'disconnectFromGoogleOAuth'
  | 'disconnectFromKakaoOAuth'
  | 'disconnectFromNaverOAuth'
  | 'logout'
  | 'submitCert'
  | 'takeAttendance'
  | 'toggleLikingPost'
  | 'unregister'
  | 'updateMyCertAgreement'
  | 'updatePost'
  | 'updateUser'
  | 'verifyCertJWT'
  | 'verifyTown'
  | 'wakeUser'
  | MutationKeySpecifier
)[]
export type MutationFieldPolicy = {
  certJWT?: FieldPolicy<any> | FieldReadFunction<any>
  createPost?: FieldPolicy<any> | FieldReadFunction<any>
  deletePost?: FieldPolicy<any> | FieldReadFunction<any>
  deleteSharingPost?: FieldPolicy<any> | FieldReadFunction<any>
  disconnectFromGoogleOAuth?: FieldPolicy<any> | FieldReadFunction<any>
  disconnectFromKakaoOAuth?: FieldPolicy<any> | FieldReadFunction<any>
  disconnectFromNaverOAuth?: FieldPolicy<any> | FieldReadFunction<any>
  logout?: FieldPolicy<any> | FieldReadFunction<any>
  submitCert?: FieldPolicy<any> | FieldReadFunction<any>
  takeAttendance?: FieldPolicy<any> | FieldReadFunction<any>
  toggleLikingPost?: FieldPolicy<any> | FieldReadFunction<any>
  unregister?: FieldPolicy<any> | FieldReadFunction<any>
  updateMyCertAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  updatePost?: FieldPolicy<any> | FieldReadFunction<any>
  updateUser?: FieldPolicy<any> | FieldReadFunction<any>
  verifyCertJWT?: FieldPolicy<any> | FieldReadFunction<any>
  verifyTown?: FieldPolicy<any> | FieldReadFunction<any>
  wakeUser?: FieldPolicy<any> | FieldReadFunction<any>
}
export type PostKeySpecifier = (
  | 'author'
  | 'commentCount'
  | 'comments'
  | 'content'
  | 'creationTime'
  | 'deletionTime'
  | 'doIComment'
  | 'doIShare'
  | 'id'
  | 'imageUrls'
  | 'isLiked'
  | 'likeCount'
  | 'parentPost'
  | 'sharedCount'
  | 'sharingPost'
  | 'updateTime'
  | PostKeySpecifier
)[]
export type PostFieldPolicy = {
  author?: FieldPolicy<any> | FieldReadFunction<any>
  commentCount?: FieldPolicy<any> | FieldReadFunction<any>
  comments?: FieldPolicy<any> | FieldReadFunction<any>
  content?: FieldPolicy<any> | FieldReadFunction<any>
  creationTime?: FieldPolicy<any> | FieldReadFunction<any>
  deletionTime?: FieldPolicy<any> | FieldReadFunction<any>
  doIComment?: FieldPolicy<any> | FieldReadFunction<any>
  doIShare?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  imageUrls?: FieldPolicy<any> | FieldReadFunction<any>
  isLiked?: FieldPolicy<any> | FieldReadFunction<any>
  likeCount?: FieldPolicy<any> | FieldReadFunction<any>
  parentPost?: FieldPolicy<any> | FieldReadFunction<any>
  sharedCount?: FieldPolicy<any> | FieldReadFunction<any>
  sharingPost?: FieldPolicy<any> | FieldReadFunction<any>
  updateTime?: FieldPolicy<any> | FieldReadFunction<any>
}
export type PostCreationResultKeySpecifier = (
  | 'newPost'
  | 'parentPost'
  | 'sharedPost'
  | PostCreationResultKeySpecifier
)[]
export type PostCreationResultFieldPolicy = {
  newPost?: FieldPolicy<any> | FieldReadFunction<any>
  parentPost?: FieldPolicy<any> | FieldReadFunction<any>
  sharedPost?: FieldPolicy<any> | FieldReadFunction<any>
}
export type PostDeletionResultKeySpecifier = (
  | 'deletedPost'
  | 'sharedPost'
  | PostDeletionResultKeySpecifier
)[]
export type PostDeletionResultFieldPolicy = {
  deletedPost?: FieldPolicy<any> | FieldReadFunction<any>
  sharedPost?: FieldPolicy<any> | FieldReadFunction<any>
}
export type QueryKeySpecifier = (
  | 'auth'
  | 'certs'
  | 'comments'
  | 'hello'
  | 'isUniqueUsername'
  | 'myCertAgreement'
  | 'myProfile'
  | 'pendingCerts'
  | 'post'
  | 'posts'
  | 'sampleCertJWT'
  | 'user'
  | 'verificationHistories'
  | QueryKeySpecifier
)[]
export type QueryFieldPolicy = {
  auth?: FieldPolicy<any> | FieldReadFunction<any>
  certs?: FieldPolicy<any> | FieldReadFunction<any>
  comments?: FieldPolicy<any> | FieldReadFunction<any>
  hello?: FieldPolicy<any> | FieldReadFunction<any>
  isUniqueUsername?: FieldPolicy<any> | FieldReadFunction<any>
  myCertAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  myProfile?: FieldPolicy<any> | FieldReadFunction<any>
  pendingCerts?: FieldPolicy<any> | FieldReadFunction<any>
  post?: FieldPolicy<any> | FieldReadFunction<any>
  posts?: FieldPolicy<any> | FieldReadFunction<any>
  sampleCertJWT?: FieldPolicy<any> | FieldReadFunction<any>
  user?: FieldPolicy<any> | FieldReadFunction<any>
  verificationHistories?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ServiceAgreementKeySpecifier = (
  | 'adAgreement'
  | 'adAgreementTime'
  | 'locationAgreement'
  | 'locationAgreementTime'
  | 'personalDataStoringYear'
  | 'privacyAgreement'
  | 'privacyAgreementTime'
  | 'termsAgreement'
  | 'termsAgreementTime'
  | ServiceAgreementKeySpecifier
)[]
export type ServiceAgreementFieldPolicy = {
  adAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  adAgreementTime?: FieldPolicy<any> | FieldReadFunction<any>
  locationAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  locationAgreementTime?: FieldPolicy<any> | FieldReadFunction<any>
  personalDataStoringYear?: FieldPolicy<any> | FieldReadFunction<any>
  privacyAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  privacyAgreementTime?: FieldPolicy<any> | FieldReadFunction<any>
  termsAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  termsAgreementTime?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TownKeySpecifier = ('count' | 'name' | TownKeySpecifier)[]
export type TownFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>
  name?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UserKeySpecifier = (
  | 'bio'
  | 'birthday'
  | 'birthyear'
  | 'blockingEndTime'
  | 'blockingStartTime'
  | 'certAgreement'
  | 'cherry'
  | 'coverImageUrls'
  | 'creationTime'
  | 'email'
  | 'followerCount'
  | 'followingCount'
  | 'grade'
  | 'id'
  | 'imageUrl'
  | 'imageUrls'
  | 'isPrivate'
  | 'isSleeping'
  | 'isVerifiedBirthday'
  | 'isVerifiedBirthyear'
  | 'isVerifiedEmail'
  | 'isVerifiedName'
  | 'isVerifiedPhoneNumber'
  | 'isVerifiedSex'
  | 'legalName'
  | 'logoutTime'
  | 'name'
  | 'nickname'
  | 'oAuthProviders'
  | 'postCount'
  | 'serviceAgreement'
  | 'sex'
  | 'sleepingTime'
  | 'towns'
  | UserKeySpecifier
)[]
export type UserFieldPolicy = {
  bio?: FieldPolicy<any> | FieldReadFunction<any>
  birthday?: FieldPolicy<any> | FieldReadFunction<any>
  birthyear?: FieldPolicy<any> | FieldReadFunction<any>
  blockingEndTime?: FieldPolicy<any> | FieldReadFunction<any>
  blockingStartTime?: FieldPolicy<any> | FieldReadFunction<any>
  certAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  cherry?: FieldPolicy<any> | FieldReadFunction<any>
  coverImageUrls?: FieldPolicy<any> | FieldReadFunction<any>
  creationTime?: FieldPolicy<any> | FieldReadFunction<any>
  email?: FieldPolicy<any> | FieldReadFunction<any>
  followerCount?: FieldPolicy<any> | FieldReadFunction<any>
  followingCount?: FieldPolicy<any> | FieldReadFunction<any>
  grade?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  imageUrl?: FieldPolicy<any> | FieldReadFunction<any>
  imageUrls?: FieldPolicy<any> | FieldReadFunction<any>
  isPrivate?: FieldPolicy<any> | FieldReadFunction<any>
  isSleeping?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedBirthday?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedBirthyear?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedEmail?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedName?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedPhoneNumber?: FieldPolicy<any> | FieldReadFunction<any>
  isVerifiedSex?: FieldPolicy<any> | FieldReadFunction<any>
  legalName?: FieldPolicy<any> | FieldReadFunction<any>
  logoutTime?: FieldPolicy<any> | FieldReadFunction<any>
  name?: FieldPolicy<any> | FieldReadFunction<any>
  nickname?: FieldPolicy<any> | FieldReadFunction<any>
  oAuthProviders?: FieldPolicy<any> | FieldReadFunction<any>
  postCount?: FieldPolicy<any> | FieldReadFunction<any>
  serviceAgreement?: FieldPolicy<any> | FieldReadFunction<any>
  sex?: FieldPolicy<any> | FieldReadFunction<any>
  sleepingTime?: FieldPolicy<any> | FieldReadFunction<any>
  towns?: FieldPolicy<any> | FieldReadFunction<any>
}
export type StrictTypedTypePolicies = {
  Cert?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertKeySpecifier | (() => undefined | CertKeySpecifier)
    fields?: CertFieldPolicy
  }
  CertAgreement?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertAgreementKeySpecifier | (() => undefined | CertAgreementKeySpecifier)
    fields?: CertAgreementFieldPolicy
  }
  Certs?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertsKeySpecifier | (() => undefined | CertsKeySpecifier)
    fields?: CertsFieldPolicy
  }
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier)
    fields?: MutationFieldPolicy
  }
  Post?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PostKeySpecifier | (() => undefined | PostKeySpecifier)
    fields?: PostFieldPolicy
  }
  PostCreationResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PostCreationResultKeySpecifier
      | (() => undefined | PostCreationResultKeySpecifier)
    fields?: PostCreationResultFieldPolicy
  }
  PostDeletionResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PostDeletionResultKeySpecifier
      | (() => undefined | PostDeletionResultKeySpecifier)
    fields?: PostDeletionResultFieldPolicy
  }
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier)
    fields?: QueryFieldPolicy
  }
  ServiceAgreement?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ServiceAgreementKeySpecifier
      | (() => undefined | ServiceAgreementKeySpecifier)
    fields?: ServiceAgreementFieldPolicy
  }
  Town?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | TownKeySpecifier | (() => undefined | TownKeySpecifier)
    fields?: TownFieldPolicy
  }
  User?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier)
    fields?: UserFieldPolicy
  }
}
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies
