import { useContext } from 'react';
import { LocomotiveScrollContext } from '../LocomotiveScrollProvider';

export const useLocomotiveScroll = () => useContext(LocomotiveScrollContext);