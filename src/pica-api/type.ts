type Image = {
    originalName: string
    path: string
    fileServer: string
}

type Category = {
    title: string
    thumb: Image
    isWeb: boolean | null
    active: boolean | null
    link: string | null
    description: string | null
    _id: string | null
}

// 简介
type Comic = {
    _id: string
    title: string
    author: string
    totalViews: number
    totalLikes: number
    pagesCount: number
    epsCount: number
    finished: true
    categories: string[]
    thumb: Image
    id: string
    likesCount: number
}

type ComicList = {
    docs: Comic[]
    total: number
    limit: number
    page: number
    pages: number
}

type Gender = 'm' | 'f'
type Creator = {
    _id: string
    gender: Gender
    name: string
    slogan: string
    title: string
    verified: boolean
    exp: number
    level: number
    characters: string[]
    role: string
    avatar: Image
    character: string // character icon url
}

// 详细信息
type ComicDetail = {
    _id: string
    _creator: Creator
    title: string
    description: string
    thumb: Image
    author: string
    chineseTeam: string // 汉化组
    categories: string[]
    tags: string[]
    pagesCount: number
    epsCount: number
    finished: boolean
    updated_at: string // timestamp string
    created_at: string // timestamp string
    allowDownload: boolean
    viewsCount: number
    likesCount: number
    isFavourite: boolean
    isLiked: boolean
    commentsCound: number
}

// 分话
type EpsItem = {
    _id: string
    title: string
    order: number      // eps id, used for getting ep info
    updated_at: string // timestamp string
    id: string
}

type Eps = {
    docs: EpsItem[]
    total: number
    limit: number
    page: number
    pages: number
}

type EpImage = {
    _id: string
    media: Image
    id: string
}

type Ep = {
    docs: EpImage[]
    total: number
    limit: number
    page: number
    pages: number
}

export {
    Category,
    Image,
    Comic,
    ComicList,
    ComicDetail,
    Creator,
    EpsItem,
    Eps,
    EpImage,
    Ep,
}
