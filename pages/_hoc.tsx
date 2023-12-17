import React, { useState } from 'react'
import { LoaderDark } from '@/components'

// Higher-order component (guard)
const withLoading = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
   const HOC: React.FC<P> = (props) => {
      const [isLoading, setIsLoading] = useState(true);
 
      setTimeout(() => {
         setIsLoading(false);
      }, 1800);

      return isLoading ? <LoaderDark /> : <WrappedComponent {...props} />;
   };

   HOC.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
   return HOC;
}

export default withLoading