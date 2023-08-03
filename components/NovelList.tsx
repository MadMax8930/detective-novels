import React from 'react'
import { isEmpty } from 'lodash'
import NovelCard from '@/components/NovelCard'

interface NovelListProps {
   header: string;
   data: Record<string, any>[];
}

const NovelList: React.FC<NovelListProps> = ({ header, data }) => {
   if (isEmpty(data)) { return null }
   
   return (
      <div className="px-4 md:px-12 mt-4 space-y-8">
         <div>
            <p className="text-black text-md md:text-xl lg:text-2xl font-semibold mb-4">{header}</p>
            <div className="grid grid-cols-4 gap-2">
               {data.map((novel) => (
                  <NovelCard key={novel.id} data={novel} />
               ))}
            </div>
         </div>     
      </div>
   )
}

export default NovelList