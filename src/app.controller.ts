import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleTrendCrawlerService } from './google-trend-crawler/google-trend-crawler.service';
import { CartoonNewsGenerator } from './cartoon-news/news2story.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly googleTrendCrawlerService: GoogleTrendCrawlerService,
    private readonly news2storyService: CartoonNewsGenerator,
  ) {}

  async getHello(): Promise<void> {
    const result = await this.news2storyService
      .news2story(`인터넷에 신상이 공개되는 등 악성 민원에 시달리다 극단 선택으로 세상을 떠난 공무원 사건과 관련, 경기 김포시가 13일 경찰에 수사를 의뢰했다.

    김병수 김포시장은 이날 오전 김포경찰서를 찾아 직접 수사의뢰서를 냈다. 신원 미상의 누리꾼들을 대상으로, 숨진 김포시 공무원 A(39)씨에 대한 공무집행방해, 모욕, 정보통신망 이용촉진 및 정보보호 등에 관한 법률상 명예훼손 혐의를 수사해달라는 취지다.
    
    이날 김 시장은 “막아주지 못해, 싸워주지 못해 미안하다”며 “유족에게 다시 한 번 위로의 말씀을 전하며 마음이 무겁지만 고인의 죽음이 헛되지 않도록 공직사회 민원 제도 개선에 나서겠다”고 말했다. 김 시장은 “수사를 통해 고인의 명예를 회복하고 순직 처리를 할 수 있도록 최선의 노력을 다하겠다”며 “제도 개선과 민원처리 시스템의 전면 검토에 총력을 기하겠다”고 했다.
    
    김포시는 수사의뢰서와 함께 온라인 카페에 올라온 A씨에 대한 신상정보 공개 글과 인신공격성 게시글 등을 갈무리해 제출했다. 김포시는 “특정 누리꾼이 고인의 개인정보를 다수 게시하거나, 민원전화 및 반복적인 게시글을 작성하는 등 이른바 ‘좌표 찍기’로 집단민원을 종용한 것으로 나타났다”고 밝혔다.
    
    이 사건은 지난 5일 오후 3시 40분쯤 인천시 서구의 한 도로에 주차된 차량에서 김포시 9급 공무원 A씨가 숨진 채 발견되면서 세상에 알려졌다. 사건을 접수한 인천 서부경찰서에 따르면 A씨는 발견 당시 호흡과 맥박이 없는 상태였으며, 차 안에서는 극단적 선택을 한 정황이 확인됐다. A씨의 자택 PC 등에는 ‘일이 힘들다’는 취지의 글이 적혀있었다고 한다.
    
    A씨는 지난달 29일 김포한강로 일대에서 진행된 포트홀(도로 파임) 보수 공사와 관련해 밤부터 극심한 차량 정체가 빚어지자, 항의성 민원에 시달린 것으로 파악됐다. 당시 ‘김포한강로가 주차장을 방불케 한다’는 게시글이 한 인터넷 카페에 올라오자, 한 누리꾼은 “공사를 승인한 주무관이 A씨”라며 그의 이름과 부서, 직통 전화번호 등을 캡처한 이미지를 댓글에 올렸다. 이에 “(A씨가)집에서 쉬고 있다” “멱살 잡고 싶다” “미친 거 아니냐”, “정신이 나갔다” “정신 나간 공무원이네” 등의 악성 댓글이 잇달아 올라왔다.
    
    김포시에 따르면, 사건 당일 시청 당직실에 전화 민원이 폭주하는 등 다음날 새벽까지 업무가 마비됐다. 민원인들은 단순 문의를 넘어 욕설 및 협박성 발언을 한 것으로도 확인됐다. 김포시는 이와 관련한 추가 증거자료를 확보해 경찰에 제출할 예정이다.
    
    김포시 관계자는 “고인의 명예회복을 위해 국가인권위원회에 진정서도 제출할 예정”이라며 “다시는 이런 일이 발생하지 않도록 엄정하고 철저한 수사가 진행되길 바란다”고 말했다.`);

    await this.news2storyService.story2Image(result);
  }
}
