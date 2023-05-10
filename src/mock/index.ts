import { IPreviewFestivalItem, IOneLineReview, User, IReviewBoard } from "src/interfaces";

export const SIMPLELIST: IPreviewFestivalItem[] = [ //? 타입 통일
    {
        festivalNumber: 1,
        festivalName: '나고야 눈 축제1',
        festivalType:"들어가지 않는 내용",
        festivalDurationStart: '2023-01-05',
        festivalDurationEnd: '2023-02-05',
        festivalArea: '일본',
        festivalTime:"들어가지 않는 내용",
        onelineReviewAverage: 10,
        festivalCost:"무료",
        festivalInformationUrl: 'https://dimg04.c-ctrip.com/images/1mj1g12000an36ieh3923.png',
        festivalInformation: '들어가지 않는 내용'
    },
    {
        festivalNumber: 2,
        festivalName: '나고야 눈 축제2',
        festivalType:"들어가지 않는 내용",
        festivalDurationStart: '2023-02-05',
        festivalDurationEnd: '2023-03-05',
        festivalArea: '일본',
        festivalTime:"들어가지 않는 내용",
        onelineReviewAverage: 10,
        festivalCost:"무료",
        festivalInformationUrl: 'https://dimg04.c-ctrip.com/images/1mj1g12000an36ieh3923.png',
        festivalInformation: '들어가지 않는 내용'
    },
    {
        festivalNumber: 3,
        festivalName: '나고야 눈 축제3',
        festivalType:"들어가지 않는 내용",
        festivalDurationStart: '2023-03-05',
        festivalDurationEnd: '2023-04-05',
        festivalArea: '일본',
        festivalTime:"들어가지 않는 내용",
        onelineReviewAverage: 10,
        festivalCost:"무료",
        festivalInformationUrl: 'https://dimg04.c-ctrip.com/images/1mj1g12000an36ieh3923.png',
        festivalInformation: '들어가지 않는 내용'
    },
    {
        festivalNumber: 4,
        festivalName: '나고야 눈 축제4',
        festivalType:"들어가지 않는 내용",
        festivalDurationStart: '2023-04-05',
        festivalDurationEnd: '2023-05-05',
        festivalArea: '일본',
        festivalTime:"들어가지 않는 내용",
        onelineReviewAverage: 10,
        festivalCost:"무료",
        festivalInformationUrl: 'https://dimg04.c-ctrip.com/images/1mj1g12000an36ieh3923.png',
        festivalInformation: '들어가지 않는 내용'
    },
    {
        festivalNumber: 5,
        festivalName: '나고야 눈 축제',
        festivalType:"들어가지 않는 내용",
        festivalDurationStart: '2023-05-05',
        festivalDurationEnd: '2023-06-05',
        festivalArea: '일본',
        festivalTime:"들어가지 않는 내용",
        onelineReviewAverage: 10,
        festivalCost:"무료",
        festivalInformationUrl: 'https://dimg04.c-ctrip.com/images/1mj1g12000an36ieh3923.png',
        festivalInformation: '들어가지 않는 내용'
    },
    {
        festivalNumber: 6,
        festivalName: '나고야 눈 축제',
        festivalType:"들어가지 않는 내용",
        festivalDurationStart: '2023-06-05',
        festivalDurationEnd: '2023-07-05',
        festivalArea: '일본',
        festivalTime:"들어가지 않는 내용",
        onelineReviewAverage: 10,
        festivalCost:"무료",
        festivalInformationUrl: 'https://dimg04.c-ctrip.com/images/1mj1g12000an36ieh3923.png',
        festivalInformation: '들어가지 않는 내용'
    },
    {
        festivalNumber: 7,
        festivalName: '나고야 눈 축제',
        festivalType:"들어가지 않는 내용",
        festivalDurationStart: '2023-07-05',
        festivalDurationEnd: '2023-08-05',
        festivalArea: '일본',
        festivalTime:"들어가지 않는 내용",
        onelineReviewAverage: 10,
        festivalCost:"무료",
        festivalInformationUrl: 'https://dimg04.c-ctrip.com/images/1mj1g12000an36ieh3923.png',
        festivalInformation: '들어가지 않는 내용'
    },
    {
        festivalNumber: 8,
        festivalName: '진주 논개제',
        festivalType:"들어가지 않는 내용",
        festivalDurationStart: '2023-05-05',
        festivalDurationEnd: '2023-05-08',
        festivalArea: '진주',
        festivalTime:"들어가지 않는 내용",
        onelineReviewAverage: 10,
        festivalCost:"성인 2000원",
        festivalInformationUrl: 'https://search.pstatic.net/common?type=n&size=174x250&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20230413_299%2F1681356027553AhOvU_JPEG%2F110_1908146_manual_image_url_1681356027538.jpg',
        festivalInformation: '들어가지 않는 내용'
    },
    {
        festivalNumber: 9,
        festivalName: '진주',
        festivalType:"들어가지 않는 내용",
        festivalDurationStart: '2023-05-05',
        festivalDurationEnd: '2023-05-08',
        festivalArea: '진주',
        festivalTime:"들어가지 않는 내용",
        onelineReviewAverage: 10,
        festivalCost:"성인 2000원",
        festivalInformationUrl: 'https://search.pstatic.net/common?type=n&size=174x250&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20230413_299%2F1681356027553AhOvU_JPEG%2F110_1908146_manual_image_url_1681356027538.jpg',
        festivalInformation: '들어가지 않는 내용'
    },
]

export const ONELINEREVIEW_LIST: IOneLineReview[] = [
    {
        festivalNumber: 1,
        userId: 'kdw@123',
        average: 4,
        oneLineReviewContent: '좋은 듯 나쁜 듯',
        userProfileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsVwzP0WK98dRLF3LRCTBU9aOBFwf-oqm4Uw&usqp=CAU',
        userNickname: 'KoreaIT Man',
        writeDatetime: '2023-05-02'
    },
    {
        festivalNumber: 1,
        userId: 'kdw@456',
        average: 2,
        oneLineReviewContent: '평범',
        userProfileUrl: '',
        userNickname: 'Beam Man',
        writeDatetime: '2023-05-03'
    },
    {
        festivalNumber: 1,
        userId: 'kdw@456',
        average: 5,
        oneLineReviewContent: '처음 가봤는데 좋아요',
        userProfileUrl: '',
        userNickname: 'Muyaho',
        writeDatetime: '2023-05-03'
    },
    {
        festivalNumber: 1,
        userId: 'kdw@456',
        average: 3,
        oneLineReviewContent: '평범',
        userProfileUrl: '',
        userNickname: 'Beam Man2',
        writeDatetime: '2023-05-03'
    },
    {
        festivalNumber: 1,
        userId: 'kdw@456',
        average: 2,
        oneLineReviewContent: '평범',
        userProfileUrl: '',
        userNickname: 'Beam Man3',
        writeDatetime: '2023-05-03'
    },
    {
        festivalNumber: 1,
        userId: 'kdw@456',
        average: 2,
        oneLineReviewContent: '평범',
        userProfileUrl: '',
        userNickname: 'Beam Man3',
        writeDatetime: '2023-05-03'
    }
]

export const SIGN_UP_CHECKBOX_LIST: IPreviewFestivalItem[] = [
    {
        festivalNumber: 1,
        festivalName: '테스트축제이름',
        festivalType: '테스트축제타입1',
        festivalDurationStart: '2023-01-01',
        festivalDurationEnd: '2023-02-01',
        festivalTime: '08',
        festivalArea: '테스트지역',
        festivalCost: '무료',
        onelineReviewAverage: null,
        festivalInformation: null,
        festivalInformationUrl: null
    }, {
        festivalNumber: 1,
        festivalName: '테스트축제이름',
        festivalType: '테스트축제타입2',
        festivalDurationStart: '2023-01-01',
        festivalDurationEnd: '2023-02-01',
        festivalTime: '08',
        festivalArea: '테스트지역',
        festivalCost: '무료',
        onelineReviewAverage: null,
        festivalInformation: null,
        festivalInformationUrl: null
    }, {
        festivalNumber: 1,
        festivalName: '테스트축제이름',
        festivalType: '테스트축제타입3',
        festivalDurationStart: '2023-01-01',
        festivalDurationEnd: '2023-02-01',
        festivalTime: '08',
        festivalArea: '테스트지역',
        festivalCost: '무료',
        onelineReviewAverage: null,
        festivalInformation: null,
        festivalInformationUrl: null
    }, {
        festivalNumber: 1,
        festivalName: '테스트축제이름',
        festivalType: '테스트축제타입4',
        festivalDurationStart: '2023-01-01',
        festivalDurationEnd: '2023-02-01',
        festivalTime: '08',
        festivalArea: '테스트지역',
        festivalCost: '무료',
        onelineReviewAverage: null,
        festivalInformation: null,
        festivalInformationUrl: null
    }, {
        festivalNumber: 1,
        festivalName: '테스트축제이름',
        festivalType: '테스트축제타입5',
        festivalDurationStart: '2023-01-01',
        festivalDurationEnd: '2023-02-01',
        festivalTime: '08',
        festivalArea: '테스트지역',
        festivalCost: '무료',
        onelineReviewAverage: null,
        festivalInformation: null,
        festivalInformationUrl: null
    },

];
export const FESTIVALLIST: IPreviewFestivalItem[] =
    [
        {
            festivalNumber: 1,
            festivalName: "빙어축제",
            festivalType: "얼음",
            festivalDurationStart: "2023-01-01",
            festivalDurationEnd: "2023-01-15",
            festivalTime: "08:00~18:00",
            festivalArea: "광주",
            festivalCost: "무료",
            onelineReviewAverage: 10,
            festivalInformationUrl: "https://search.pstatic.net/common?type=n&size=174x250&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20221222_86%2F1671684709584YyuPG_JPEG%2F2937394_image2_1.jpg",
            festivalInformation: "대자연과 함께하는 '인제빙어축제' 인제 빙어축제는 자연환경이 선물해 준 광활한 벌판 속에서 빙어를 잡고, 겨울 놀이터에서 다함께 즐기며 하나되는 축제이다.1997년 1회를 시작으로 관광객들의 많은 관심과 참여속에서 점점 더 발전하고 변화하고 있는 인제빙어축제는 시대에 발맞춰 여러가지 프로그램들을 개발하고 있다. 천혜의 자연을 배경으로 겨울철 소양강 최상류로 찾아드는 빙어떼의 아름다운 귀환과 즐거운 추억을 인제빙어축제와 함께 만들어 가시기 바란다."
        },
        {
            festivalNumber: 2,
            festivalName: "방어축제",
            festivalType: "지역",
            festivalDurationStart: "2023-01-01",
            festivalDurationEnd: "2023-01-15",
            festivalTime: "08:00~18:00",
            festivalArea: "광주",
            festivalCost: "무료",
            onelineReviewAverage: 10,
            festivalInformationUrl: "https://search.pstatic.net/common?type=n&size=174x250&quality=85&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20230419_187%2F1681867631467bIKbx_JPEG%2F2975155_image2_1.jpg",
            festivalInformation: "대자연과 함께하는 '인제빙어축제' 인제 빙어축제는 자연환경이 선물해 준 광활한 벌판 속에서 빙어를 잡고, 겨울 놀이터에서 다함께 즐기며 하나되는 축제이다.1997년 1회를 시작으로 관광객들의 많은 관심과 참여속에서 점점 더 발전하고 변화하고 있는 인제빙어축제는 시대에 발맞춰 여러가지 프로그램들을 개발하고 있다. 천혜의 자연을 배경으로 겨울철 소양강 최상류로 찾아드는 빙어떼의 아름다운 귀환과 즐거운 추억을 인제빙어축제와 함께 만들어 가시기 바란다."
        }
        ,
    ]
    
export const USER:User[]=[
    {
    userId:"a",
    passwor:'a',
    nickname:"a",
    telNumber:"000-0000-0000",
    profileUrl:"",
    interestedFestivalType:['얼음']
    }
   ,
    {
    userId:"b",
    passwor:'b',
    nickname:"a",
    telNumber:"000-0000-0000",
    profileUrl:"",
    interestedFestivalType:['지역']
    }
]

export const REVIEW_BOARD_LIST : IReviewBoard[] = [
    {
        boardNumber: 1,
        boardTitle: '야호 신나는 축제',
        boardContent: '다시 오고 싶',
        boardImgUrl: 'data:image/jpeg;base64,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',
        boardWriteDatetime: '2023-05-09',
        viewCount: 777777,
        recommendCount: 9523,
        commentCount: 35,
        writerId: 'koreaIT@123.com',
        writerProfileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVqz9dQwR5FCOzIu-owQ_lq68EsVggsvrXxA&usqp=CAU',
        writerNickname: 'Beam Man',
        festivalNumber: 1
    },
    {
        boardNumber: 1,
        boardTitle: '야호 신나는 축제',
        boardContent: '다시 오고 싶',
        boardImgUrl: '',
        boardWriteDatetime: '2023-05-09',
        viewCount: 777777,
        recommendCount: 9523,
        commentCount: 35,
        writerId: 'koreaIT@123.com',
        writerProfileUrl: '',
        writerNickname: 'Beam Man',
        festivalNumber: 1
    },
    {
        boardNumber: 1,
        boardTitle: '야호 신나는 축제',
        boardContent: '다시 오고 싶',
        boardImgUrl: '',
        boardWriteDatetime: '2023-05-09',
        viewCount: 777777,
        recommendCount: 9523,
        commentCount: 35,
        writerId: 'koreaIT@123.com',
        writerProfileUrl: '',
        writerNickname: 'Beam Man',
        festivalNumber: 1
    },
    {
        boardNumber: 1,
        boardTitle: '야호 신나는 축제',
        boardContent: '다시 오고 싶',
        boardImgUrl: '',
        boardWriteDatetime: '2023-05-09',
        viewCount: 777777,
        recommendCount: 9523,
        commentCount: 35,
        writerId: 'koreaIT@123.com',
        writerProfileUrl: '',
        writerNickname: 'Beam Man',
        festivalNumber: 1
    },
    {
        boardNumber: 1,
        boardTitle: '야호 신나는 축제',
        boardContent: '다시 오고 싶',
        boardImgUrl: '',
        boardWriteDatetime: '2023-05-09',
        viewCount: 777777,
        recommendCount: 9523,
        commentCount: 35,
        writerId: 'koreaIT@123.com',
        writerProfileUrl: '',
        writerNickname: 'Beam Man',
        festivalNumber: 1
    }
]