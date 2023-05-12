interface Dto{
     festivalNumber:number;
     festivalName: string;
     festivalType: string;
     festivalDurationStart:string;
     festivalDurationEnd:string;
     festivalTime:string;
     festivalArea: string;
     festivalCost: string | null;
     festivalInformation: string ;
     festivalInformationUrl:string | null;
     onelineReviewAverage:number;
     festivalHomepage: string;
}

export default Dto;