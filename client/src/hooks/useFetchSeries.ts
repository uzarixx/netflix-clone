import { useEffect, useState } from 'react';
import { ISeries } from '../constants/types';
import ContentService from '../services/fetchServices/contentService';
import { useParams } from 'react-router-dom';


export const useFetchSeries = () => {
  const param = useParams();
  const [series, setSeries] = useState<ISeries>();
  useEffect(() => {
    const fetchSeries = async (id: string | undefined) => {
      const { data } = await ContentService.fetchSeries(id ? id : '');
      setSeries(data);
    };
    param?.id && fetchSeries(param?.id);
  }, [param]);
  return { series, contentId: param.id };
};