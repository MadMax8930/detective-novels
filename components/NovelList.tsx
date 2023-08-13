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
      <div className="min-h-full px-4 md:px-12 mt-4 space-y-8">
         <div className="pt-24 pb-4">
            <p className="text-black text-md md:text-xl lg:text-2xl font-semibold my-2">{header}</p>
            <div className="grid grid-cols-5 gap-0.5">
               {data.map((novel) => (
                  <NovelCard key={novel.id} data={novel} />
               ))}
            </div>
         </div>     
      </div>
   )
}

export default NovelList