import React from 'react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux'
import configureStore from '../../store'
import { Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory';
import WorkCard from './WorkCard'

import 'uikit/dist/js/uikit'
import 'normalize.css/normalize.css'
import '../../styles/style.scss'

const store = configureStore()
const history = createBrowserHistory();

export default {
  title: 'WorkCard',
  component: WorkCard,
};

let work = {
    description: "開発の依頼を受け、柏の葉のイベントサイトを構築した。先方と仕様の確認を取りつつWordpressでテーマの開発を行った。<br> <br> チーム: デザイナー１人、エンジニア１人<br> 担当: エンジニア",
    images: ["kashiwanoha-01.png"],
    skills: ["Wordpress"],
    thumbnail: "kashiwanoha-navi-eyecatch.png",
    thumbnailURL: "https://firebasestorage.googleapis.com/v0/b/portfolio-react-3d680.appspot.com/o/kashiwanoha-navi-eyecatch.png?alt=media&token=bf9e06b8-4ee2-45de-8885-f381ac52b95a",
    title: "柏の葉ナビ",
    year: "2019/06",
    imageURLs: [],
}

export const WorkCard01 = () => (
  <Provider store={store}>
    <Router history={history}>
      <div className="uk-child-width-1-3@m" uk-grid="">
        <WorkCard key={1} work={work}></WorkCard>
      </div>
    </Router>
  </Provider>
  )