import { FC } from 'react';
import PreviewVideo from '../../ui/previewVideo';
import styles from './MainContent.module.scss';
import MoreInfo from '../../popups/moreInfo';
import ContentSlider from '../../ui/contentSlider';

const MainContent: FC = () => {

  return (<>
    <MoreInfo />
    <div className={styles.mainContainer}>
      <PreviewVideo />
      <ContentSlider />
    </div>
  </>);
};
export default MainContent;