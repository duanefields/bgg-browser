export type RankResponse = {
  _type: string
  _id: string
  _name: string
  _friendlyname: string
  _value: string
  _bayesaverage: string
}

export type ItemResponse = {
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
    _maxplayers: string
    _minplaytime: string
    _maxplaytime: string
    _playingtime: string
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

export type CollectionResponse = {
  items: {
    item: ItemResponse[]
  }
  _totalitems: string
  _termsofuse: string
  _pubdate: string
}
