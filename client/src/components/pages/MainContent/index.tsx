import { FC } from 'react';
import PreviewVideo from '../../ui/previewVideo';
import styles from './MainContent.module.scss';
import MoreInfo from '../../popups/moreInfo';

const MainContent: FC = () => {
  return (<>
    <MoreInfo />
    <div className={styles.mainContainer}>
      <PreviewVideo />
      <div className={styles.mainWrapper}>
        4124
      </div>
    </div>
  </>);
};
export default MainContent;