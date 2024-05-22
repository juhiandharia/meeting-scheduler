"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ScheduledMeetingList from './_components/ScheduledMeetingList'
import { collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '@/config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { format } from 'date-fns'


function ScheduledMeeting() {

    const db=getFirestore(app);
    const {user}=useKindeBrowserClient();
    const [meetingList,setMeetingList]=useState([]);

    useEffect(()=>{
        user&&getScheduledMeetigs();
    },[user])

    const getScheduledMeetigs=async()=>{
        setMeetingList([])
        const q=query(collection(db,'ScheduledMeetings'),
        where('businessEmail','==',user.email));
        const querySnapshot=await getDocs(q);

        querySnapshot.forEach(doc=>{
            console.log(doc.data());
            setMeetingList(prev=>[...prev,doc.data()])
        })
    }


    const filterMeetinList=(type)=>{

        if(type=='upcoming')
        {
            return meetingList.filter(item=>item.formatedTimeStamp>=format(new Date(),'t'));
            
        }
        else{
            return meetingList.filter(item=>item.formatedTimeStamp<format(new Date(),'t'));
        }
    }

    return (
        <div>
            <h2 className='font-bold text-2xl'>Scheduled Meetings</h2>
            <hr className='my-5'></hr>
            <Tabs defaultValue="upcoming" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="expired">Expired</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <ScheduledMeetingList
                    meetingList={filterMeetinList('upcoming')}
                    /> 
                </TabsContent>
                <TabsContent value="expired">
                <ScheduledMeetingList
                    meetingList={filterMeetinList('expired')}
                    /> 
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default ScheduledMeeting