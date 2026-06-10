const createMarkerIcon = (color, initial) => {
  const svg = `
    <svg width="42" height="52" viewBox="0 0 42 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 0C11.625 0 4 7.625 4 17C4 29.5 21 52 21 52C21 52 38 29.5 38 17C38 7.625 30.375 0 21 0Z" fill="${color}" fill-opacity="0.9" stroke="white" stroke-width="1.5"/>
        <text x="21" y="22" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle" dy=".3em">${initial}</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${window.btoa(svg)}`;
};

const imageCounters = { living: 0, commercial: 0, resorts: 0 };

export const properties = [
  {
    id: 1, type: "living", filterTag: "officetel", typeLabel: "오피스텔",
    status: "completed", completionYear: "2023",
    scale: "1,208실", floors: "지하6/지상20층",
    location: "인천 부평구 부평동",
    title: "부평역 대림 e-시티",
    lat: 37.490, lng: 126.719,
    url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=1873580302&urlLevel=1&urlX=437894&urlY=1108633",
  },
  {
    id: 2, type: "living", typeLabel: "주택",
    status: "completed", completionYear: "2024",
    scale: "655세대", floors: "지하2/지상33층",
    location: "충남 천안시 동남구 청당동",
    title: "천안행정타운 센트럴 두산위브",
    lat: 36.779, lng: 127.153,
    url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=412129454&urlLevel=5&urlX=535215&urlY=912090",
  },
  {
    id: 3, type: "living", typeLabel: "주택",
    status: "completed", completionYear: "2009",
    scale: "940세대", floors: "지하1/지상31층",
    location: "충남 아산시 용화동",
    title: "용화마을 신도브래뉴",
    lat: 36.7726, lng: 127.01252,
    url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=11113991&urlLevel=3&urlX=502831&urlY=909448",
  },
  {
    id: 4, type: "living", typeLabel: "주택",
    status: "completed", completionYear: "2007",
    scale: "1,647세대", floors: "지하2/지상15층",
    location: "충남 천안시 청당동",
    title: "청당 벽산 블루밍",
    lat: 36.779, lng: 127.156,
    url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=11231379&urlLevel=4&urlX=535002&urlY=911647",
  },
  {
    id: 5, type: "living", typeLabel: "주택",
    status: "completed", completionYear: "2005",
    scale: "1,086세대", floors: "지하2/지상20층",
    location: "경기 고양시 일산서구 가좌동",
    title: "일산 가좌 벽산 블루밍",
    lat: 37.6896, lng: 126.72289,
    url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=11072400&urlLevel=2&urlX=438856&urlY=1163951",
  },
  {
    id: 6, type: "living", typeLabel: "주택",
    status: "completed", completionYear: "2002",
    scale: "329세대", floors: "지하2/지상16층",
    location: "경기 고양시 일산서구 대화동",
    title: "일산 대화 GS자이",
    lat: 37.670, lng: 126.7287,
    url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=11540449&urlLevel=1&urlX=440226&urlY=1158466",
  },
  {
    id: 7, type: "living", typeLabel: "주택",
    status: "completed", completionYear: "1998",
    scale: "347세대", floors: "지하1/지상18층",
    location: "서울 서초구 잠원동",
    title: "신반포 청구 아파트",
    lat: 37.5142, lng: 127.00845,
    url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=11159136&urlLevel=2&urlX=501866&urlY=1115183",
  },
  {
    id: 8, type: "living", typeLabel: "주택",
    status: "completed", completionYear: "1999",
    scale: "125세대", floors: "지하1/지상19층",
    location: "서울 강서구 염창동",
    title: "염창 금호 타운 아파트",
    lat: 37.5514, lng: 126.8742,
    url: "https://kko.to/Jllj2PQNor",
  },
  {
    id: 9, type: "commercial", filterTag: "officetel", typeLabel: "오피스텔",
    status: "completed", completionYear: "2012",
    scale: "오피스텔 41실", floors: "지하3/지상9층",
    location: "경기 용인시 수지구 상현동",
    title: "광교 상현역 킴앤코 시티하임 I",
    lat: 37.2981441104908, lng: 127.069888507164,
    url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=18995819&urlLevel=1&urlX=515491&urlY=1055256",
  },
  {
    id: 10, type: "commercial", filterTag: "officetel", typeLabel: "오피스텔",
    status: "completed", completionYear: "2015",
    scale: "오피스텔 100실", floors: "지하5/지상9층",
    location: "경기 수원시 영통구 이의동",
    title: "광교 경기대역 킴앤코 시티하임 II",
    lat: 37.2999363591715, lng: 127.044308069371,
    url: "https://map.kakao.com/?map_type=TYPE_MAP&itemId=26589235&urlLevel=1&urlX=509863&urlY=1055760",
  },
  {
    id: 11, type: "commercial", typeLabel: "상업시설",
    status: "completed", completionYear: "2017",
    scale: "근린생활 29호실", floors: "지하1/지상5층",
    location: "경기 수원시 영통구 이의동",
    title: "광교 K-tower",
    lat: 37.2992306061982, lng: 127.042759297239,
    url: "https://map.kakao.com/?map_type=TYPE_MAP&map_attribute=ROADVIEW&q=%EA%B2%BD%EA%B8%B0+%EC%88%98%EC%9B%90%EC%8B%9C+%EC%98%81%ED%86%B5%EA%B5%AC+%EB%8C%80%ED%95%993%EB%A1%9C+1&urlLevel=2&urlX=509564&urlY=1055558",
  },
  {
    id: 12, type: "commercial", typeLabel: "상업시설",
    status: "inProgress", completionYear: "진행중", usage: "업무 + 근린생활", hasImage: false,
    scale: "212호실", floors: "지하4/지상11층",
    location: "인천 서구 당하동",
    title: "검단 The K-tower",
    lat: 37.591567, lng: 126.711108,
    url: "https://map.kakao.com/?q=%EC%9D%B8%EC%B2%9C+%EC%84%9C%EA%B5%AC+%EB%8B%B9%ED%95%98%EB%8F%99+1237&urlLevel=3",
  },
  {
    id: 13, type: "commercial", typeLabel: "상업시설",
    status: "inProgress", completionYear: "진행중", usage: "주차 + 근린생활", hasImage: false,
    scale: "주차 136면 + 근린상가 19호실", floors: "지하1/지상5층",
    location: "인천 서구 당하동",
    title: "검단 The K-tower 주차",
    lat: 37.589438, lng: 126.708078,
    url: "https://map.kakao.com/?q=%EC%9D%B8%EC%B2%9C+%EC%84%9C%EA%B5%AC+%EB%8B%B9%ED%95%98%EB%8F%99+1250&urlLevel=3",
  },
].map(property => {
  imageCounters[property.type]++;
  return {
    ...property,
    image: `/img/portfolio/${property.type}-${imageCounters[property.type]}.png`,
  };
});

export const markerInfo = {
  living:     { color: '#EF4444', initial: 'L' },
  commercial: { color: '#F59E0B', initial: 'C' },
  officetel:  { color: '#3B82F6', initial: 'O' },
  inProgress: { color: '#22C55E', initial: 'P' },
};

export const markerSources = {
  living:     createMarkerIcon(markerInfo.living.color,     markerInfo.living.initial),
  commercial: createMarkerIcon(markerInfo.commercial.color, markerInfo.commercial.initial),
  officetel:  createMarkerIcon(markerInfo.officetel.color,  markerInfo.officetel.initial),
  inProgress: createMarkerIcon(markerInfo.inProgress.color, markerInfo.inProgress.initial),
};
