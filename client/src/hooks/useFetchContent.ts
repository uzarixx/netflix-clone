import { useEffect, useState } from 'react';
import { ISeries } from '../constants/types';
import ContentService from '../services/fetchServices/contentService';
import { useParams } from 'react-router-dom';


export const useFetchContent = () => {
  const param = useParams();
  const [content, setContent] = useState<ISeries>();
  useEffect(() => {
    const fetchContent = async (id: string | undefined) => {
      const { data } = await ContentService.getContent(id ? id : '');
      setContent(data);
    };
    param?.id && fetchContent(param?.id);
  }, [param]);
  return { content, contentId: param.id };
};