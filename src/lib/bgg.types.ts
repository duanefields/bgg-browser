export interface RankResponse {
  _type: string
  _id: string
  _name: string
  _friendlyname: string
  _value: string
  _bayesaverage: string
}

export interface ItemResponse {
  _objectid: number
  name: {
    _sortindex: string
    __text: string
  }
  yearpublished: string
  image: string
  thumbnail: string
  stats: {
    _minplayers: string
    _maxplayers?: string
    _minplaytime?: string
    _maxplaytime?: string
    _playingtime?: string
    _numowned: string
    rating: {
      usersrated: {
        _value: string
      }
      average: {
        _value: string
      }
      bayesaverage: {
        _value: string
      }
      stddev: {
        _value: string
      }
      median: {
        _value: string
      }
      ranks: {
        rank: RankResponse[] | { _value: string }
        _value: string
      }
      _value: string
    }
  }
  status: {
    _own: string
    _prevowned: string
    _fortrade: string
    _want: string
    _wanttoplay: string
    _wanttobuy: string
    _wishlist: string
    _preordered: string
    _lastmodified: string
  }
  numplays: string
  _objecttype: string
  _subtype: string
  _collid: string
}

export interface CollectionResponse {
  items: {
    item?: ItemResponse[]
  }
  _totalitems: string
  _termsofuse: string
  _pubdate: string
}

export interface UserResponse {
  user: {
    firstname: { _value: string }
    lastname: { _value: string }
    avatarlink: { _value: string }
    yearregistered: { _value: string }
    lastlogin: { _value: string }
    stateorprovince: { _value: string }
    country: { _value: string }
    webaddress: { _value: string }
    xboxaccount: { _value: string }
    wiiaccount: { _value: string }
    psnaccount: { _value: string }
    battlenetaccount: { _value: string }
    steamaccount: { _value: string }
    traderating: { _value: string }
    _id: string
    _name: string
    _termsofuse: string
  }
}

export interface InvalidUsernameResponse {
  errors: {
    error: {
      message: string
    }
  }
}

export interface CollectionProcessingResponse {
  message: string
}
