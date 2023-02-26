export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDate: any;
  AWSDateTime: any;
  AWSEmail: any;
  AWSIPAddress: any;
  AWSJSON: any;
  AWSPhone: any;
  AWSTime: any;
  AWSTimestamp: any;
  AWSURL: any;
};

export type Common = {
  created: Scalars['AWSDateTime'];
  creator: Scalars['ID'];
  creatorType: EntityType;
  discontinued: Scalars['Boolean'];
  entityType: EntityType;
  id: Scalars['ID'];
  modified?: Maybe<Scalars['AWSDateTime']>;
};

export type Coordinates = {
  __typename?: 'Coordinates';
  x: Scalars['String'];
  y: Scalars['String'];
};

export type CoordinatesInput = {
  x: Scalars['String'];
  y: Scalars['String'];
};

export type CreateEstateInput = {
  coorindates?: InputMaybe<CoordinatesInput>;
  name: Scalars['String'];
};

export enum EntityType {
  Estate = 'ESTATE',
  User = 'USER'
}

export type Estate = Common & {
  __typename?: 'Estate';
  coorindates?: Maybe<Coordinates>;
  created: Scalars['AWSDateTime'];
  creator: Scalars['ID'];
  creatorType: EntityType;
  discontinued: Scalars['Boolean'];
  entityType: EntityType;
  id: Scalars['ID'];
  modified?: Maybe<Scalars['AWSDateTime']>;
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEstate: Estate;
};


export type MutationCreateEstateArgs = {
  input: CreateEstateInput;
};

export type Query = {
  __typename?: 'Query';
  getEstate: Estate;
};


export type QueryGetEstateArgs = {
  id: Scalars['String'];
};
