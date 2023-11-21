let a = [
    { userName: 'Thái Thắng' },
    {
        id: 'Z6068UFE',
        name: 'Thà Cô Đơn Còn Hơn',
        Artist: { id: 'IWZA6DED', name: 'Quang Đăng Trần' }
    },
    {
        id: 'Z600D0ZB',
        name: 'Em Nên Dừng Lại (Lofi Version)',
        Artist: { id: 'IWZ9ZB7D', name: 'Khang Việt' }
    },
    {
        id: 'Z607EIO0',
        name: 'Tay Trái Chỉ Trăng',
        Artist: { id: 'IWZ97WAZ', name: 'Dương Hoàng Yến' }
    },
    {
        id: 'Z60EIABZ',
        name: 'Phong Vân',
        Artist: { id: 'IWZAWBCZ', name: 'Võ Kiều Vân' }
    },
    {
        id: 'Z6067ZFW',
        name: 'Xin Được Phép',
        Artist: { id: 'IW77ZO89', name: 'Vang' }
    }
]
let b = a.shift()
// a.forEach(song => {
//     console.log(song)
// })

let c = [
    {
        id: 'Z6068UFE',
        name: 'Thà Cô Đơn Còn Hơn',
        source: 'https://a128-zmp3.zmdcdn.me/0598f478e091d3360d35f02ad1438991?authen=exp=1699769234~acl=/0598f478e091d3360d35f02ad1438991/*~hmac=593cf96d790a04dd7ecfbdcf8e300914&fs=MTY5OTU5NjQzNDM5MHx3ZWJWNHwxLjUyLjEwNi42Mw',
        keySource: 'kGcnyZkVplDAXBcymTDmLmyLCEhDhQszs',
        Artist: { id: 'IWZA6DED', name: 'Quang Đăng Trần' }
    },
    {
        id: 'Z600D0ZB',
        name: 'Em Nên Dừng Lại (Lofi Version)',
        source: 'https://a128-zmp3.zmdcdn.me/4f96f21e46a7a3e6a9bd0c46d5d96a2d?authen=exp=1699767669~acl=/4f96f21e46a7a3e6a9bd0c46d5d96a2d/*~hmac=70aef78698f08245f44fd7035eb7c26b&fs=MTY5OTU5NDg2OTkwMXx3ZWJWNHwyNy42Ny4yOC4xODg',
        keySource: 'ZmJGykLBpGpHskpymtbHLGtkgiXbCgcWH',
        Artist: { id: 'IWZ9ZB7D', name: 'Khang Việt' }
    },
    {
        id: 'Z607EIO0',
        name: 'Tay Trái Chỉ Trăng',
        source: 'https://a128-zmp3.zmdcdn.me/6bb0d44de5efc72f9d6b935a6de01f41?authen=exp=1699769316~acl=/6bb0d44de5efc72f9d6b935a6de01f41/*~hmac=69be203db82c066abd62c6c355e50b2a&fs=MTY5OTU5NjUxNjmUsICwOXx3ZWJWNHwxLjUyLjEwNi42Mw',
        keySource: 'LmxmtLkBpQZVsNgTHyvmkmTkhuhvhSRpZ',
        Artist: { id: 'IWZ97WAZ', name: 'Dương Hoàng Yến' }
    },
    {
        id: 'Z60EIABZ',
        name: 'Phong Vân',
        source: 'https://a128-zmp3.zmdcdn.me/91a2e7f7123aaf6883e851b8024a6380?authen=exp=1696237344~acl=/91a2e7f7123aaf6883e851b8024a6380/*~hmac=56dfe331fe96c0ebf1fd120a6999f245&fs=MTY5NjA2NDU0NDg4Nnx3ZWJWNHwxLjUzLjE5OC40NA',
        keySource: 'kmJmyLZBWuDLNZNtHTDmkHTkhRhFhQFJW',
        Artist: { id: 'IWZAWBCZ', name: 'Võ Kiều Vân' }
    },
    {
        id: 'Z6067ZFW',
        name: 'Xin Được Phép',
        source: 'https://a128-zmp3.zmdcdn.me/695b8d1e217ed3c68a535ce39a28c069?authen=exp=1699769234~acl=/695b8d1e217ed3c68a535ce39a28c069/*~hmac=4fb354c6a5cf3095eb584d923fa24a41&fs=MTY5OTU5NjQzNDMxOHx3ZWJWNHwxLjUyLjEwNi42Mw',
        keySource: 'kmxGyZLdpzbHscCtmtFGkntZgiCFCpaEE',
        Artist: { id: 'IW77ZO89', name: 'Vang' }
    }
]