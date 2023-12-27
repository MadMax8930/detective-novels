import React from 'react'
import { isEmpty } from 'lodash'
import { NovelCard } from '@/components'

interface NovelListProps {
   header: string;
   data: Record<string, any>[];
}

const NovelList: React.FC<NovelListProps> = ({ header, data }) => {
   if (isEmpty(data)) { return null }
   
   return (
      <div className="min-h-full px-6 md:px-16 lg:px-12 space-y-8 pt-3">
         <div className="lg:pt-0 md:pt-20 sm:pt-16 pt-20 md:pb-4 pb-0">
            <p className="title-header text-primary-black md:text-start text-center text-sm md:text-base lg:text-xl font-semibold md:pl-1 lg:mt-2 md:mt-6 mt-4 lg:mb-1 md:mb-2 mb-4">
               {header}
            </p>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-0.5">
               {data.map((novel) => (
                  <NovelCard key={novel.id} data={novel} />
               ))}
            </div>
         </div>     
      </div>
   )
}

export default NovelList