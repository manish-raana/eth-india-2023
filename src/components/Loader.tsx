import React from 'react'

type Props = {
    isLoading: boolean
}
const Loader = ({ isLoading }: Props) => {
  return (
    <span className={`loading loading-spinner loading-md ${isLoading ? 'block' : 'hidden'}`}></span>
  );
};

export default Loader