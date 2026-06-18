import React from 'react'
import { IoMailOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5'
import { SiFigma } from 'react-icons/si'

const Contact = () => {
  return (
    <section className="relative w-full h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50/20">
      
      <div className="px-6 md:px-16 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-black tracking-wider uppercase">Contact Info</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-1">ข้อมูลการติดต่อ</h1>
            </div>
            
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4">
                <div className="p-2.5 text-black rounded-xl shrink-0">
                  <IoLocationOutline size={20} />
                </div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  106/51 ท่าอิฐ ปากเกร็ด นนทบุรี 11120
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 text-black rounded-xl shrink-0">
                  <IoCallOutline size={20} />
                </div>
                <a href="tel:021234567" className="text-gray-600 text-sm md:text-base hover:text-[#FF7A7A] transition-colors font-medium">
                  088-665-1690
                </a>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 text-black rounded-xl shrink-0">
                  <IoMailOutline size={20} />
                </div>
                <a href="mailto:mrapiiwat@gmail.com" className="text-gray-600 text-sm md:text-base hover:text-[#FF7A7A] transition-colors font-medium">
                  mrapiiwat@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-sm">
            <div className="w-12 h-12 bg-gray-950 text-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
              <SiFigma size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">UI/UX Design Credit</h2>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              โครงสร้างเลย์เอาต์และการจัดวางองค์ประกอบบนเว็บไซต์นี้ ได้รับแรงบันดาลใจและอ้างอิงต้นฉบับมาจากผลงานสร้างสรรค์ใน Figma Community
            </p>
            
            <div className="mt-8">
              <a 
                href="https://www.figma.com/community/file/1352279668921102753" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gray-900 text-white hover:bg-gray-800 text-sm font-semibold rounded-xl transition-all shadow-xs"
              >
                <SiFigma size={16} />
                <span>ดูต้นฉบับบน Figma</span>
              </a>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Contact