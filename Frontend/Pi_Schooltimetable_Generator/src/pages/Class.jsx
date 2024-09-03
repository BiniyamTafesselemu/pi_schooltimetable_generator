import SectionCard from "../components/SectionCard"
import SecitonLocator from "../components/SecitonLocator"
import { useState } from 'react';
import AddSection from "../components/AddSection";
import HeadBan from "../components/HeadBan";
export default function Class(){
  let Sections = [
    {
        SectionCategory: "SectionCategory 1",
        Sections:[
            {
                SectionName: "A",
                Subjects: [
                    {
                        Subject: "English",
                        Teacher: { name: "Abel Wondensen", ID: 1, img: ``}
                    },
                    {
                        Subject: "Mathematics",
                        Teacher: { name: "Saimon Wondensen", ID: 2, img: ``,}
                    },
                    {
                        Subject: "Physics",
                        Teacher: { name: "bell hooks", ID: 1, img: ``,}
                    },
                ]
            },

            {
                SectionName: "B",
                Subjects: [
                    {
                        Subject: "English",
                        Teacher: { name: "Tom Wondensen", ID: 1, img: ``,}
                    },
                    {
                        Subject: "Mathematics",
                        Teacher: { name: "Keven Wondensen", ID: 2, img: ``,}
                    },
                    {
                        Subject: "Physics",
                        Teacher: { name: "Hank hooks", ID: 1, img: ``,}
                    },
                ]
            },

            {
                SectionName: "C",
                Subjects: [
                    {
                        Subject: "English",
                        Teacher: { name: "Ethen Becker", ID: 1, img: ``,}
                    },
                    {
                        Subject: "Mathematics",
                        Teacher: { name: "James Hinderesen", ID: 2, img: ``,}
                    },
                    {
                        Subject: "Physics",
                        Teacher: { name: "FD Signifier", ID: 1, img: ``,}
                    },
                ]
            },
        ]
    },
    {
      SectionCategory: "SectionCategory 2",
      Sections:[
          {
              SectionName: "A",
              Subjects: [
                  {
                      Subject: "English",
                      Teacher: { name: "Abel Wondensen", ID: 1, img: ``}
                  },
                  {
                      Subject: "Mathematics",
                      Teacher: { name: "Saimon Wondensen", ID: 2, img: ``,}
                  },
                  {
                      Subject: "Physics",
                      Teacher: { name: "bell hooks", ID: 1, img: ``,}
                  },
              ]
          },

          {
              SectionName: "B",
              Subjects: [
                  {
                      Subject: "English",
                      Teacher: { name: "Tom Wondensen", ID: 1, img: ``,}
                  },
                  {
                      Subject: "Mathematics",
                      Teacher: { name: "Keven Wondensen", ID: 2, img: ``,}
                  },
                  {
                      Subject: "Physics",
                      Teacher: { name: "Hank hooks", ID: 1, img: ``,}
                  },
              ]
          },

          {
              SectionName: "C",
              Subjects: [
                  {
                      Subject: "English",
                      Teacher: { name: "Ethen Becker", ID: 1, img: ``,}
                  },
                  {
                      Subject: "Mathematics",
                      Teacher: { name: "James Hinderesen", ID: 2, img: ``,}
                  },
                  {
                      Subject: "Physics",
                      Teacher: { name: "FD Signifier", ID: 1, img: ``,}
                  },
              ]
          },
      ]
  },
  {
    SectionCategory: "SectionCategory 3",
    Sections:[
        {
            SectionName: "A",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Abel Wondensen", ID: 1, img: ``}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "Saimon Wondensen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "bell hooks", ID: 1, img: ``,}
                },
            ]
        },

        {
            SectionName: "B",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Tom Wondensen", ID: 1, img: ``,}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "Keven Wondensen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "Hank hooks", ID: 1, img: ``,}
                },
            ]
        },

        {
            SectionName: "C",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Ethen Becker", ID: 1, img: ``,}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "James Hinderesen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "FD Signifier", ID: 1, img: ``,}
                },
            ]
        },
        {
            SectionName: "D",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Ethen Becker", ID: 1, img: ``,}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "James Hinderesen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "FD Signifier", ID: 1, img: ``,}
                },
            ]
        },
    ]
},
{
    SectionCategory: "SectionCategory 4",
    Sections:[
        {
            SectionName: "A",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Abel Wondensen", ID: 1, img: ``}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "Saimon Wondensen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "bell hooks", ID: 1, img: ``,}
                },
            ]
        },

        {
            SectionName: "B",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Tom Wondensen", ID: 1, img: ``,}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "Keven Wondensen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "Hank hooks", ID: 1, img: ``,}
                },
            ]
        },

        {
            SectionName: "C",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Ethen Becker", ID: 1, img: ``,}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "James Hinderesen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "FD Signifier", ID: 1, img: ``,}
                },
            ]
        },
        {
            SectionName: "D",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Ethen Becker", ID: 1, img: ``,}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "James Hinderesen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "FD Signifier", ID: 1, img: ``,}
                },
            ]
        },
    ]
},
{
    SectionCategory: "SectionCategory 5",
    Sections:[
        {
            SectionName: "A",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Abel Wondensen", ID: 1, img: ``}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "Saimon Wondensen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "bell hooks", ID: 1, img: ``,}
                },
            ]
        },

        {
            SectionName: "B",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Tom Wondensen", ID: 1, img: ``,}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "Keven Wondensen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "Hank hooks", ID: 1, img: ``,}
                },
            ]
        },

        {
            SectionName: "C",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Ethen Becker", ID: 1, img: ``,}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "James Hinderesen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "FD Signifier", ID: 1, img: ``,}
                },
            ]
        },
        {
            SectionName: "D",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Ethen Becker", ID: 1, img: ``,}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "James Hinderesen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "FD Signifier", ID: 1, img: ``,}
                },
            ]
        },
    ]
},
{
    SectionCategory: "SectionCategory 6",
    Sections:[
        {
            SectionName: "A",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Abel Wondensen", ID: 1, img: ``}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "Saimon Wondensen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "bell hooks", ID: 1, img: ``,}
                },
            ]
        },

        {
            SectionName: "B",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Tom Wondensen", ID: 1, img: ``,}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "Keven Wondensen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "Hank hooks", ID: 1, img: ``,}
                },
            ]
        },

        {
            SectionName: "C",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Ethen Becker", ID: 1, img: ``,}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "James Hinderesen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "FD Signifier", ID: 1, img: ``,}
                },
            ]
        },
        {
            SectionName: "D",
            Subjects: [
                {
                    Subject: "English",
                    Teacher: { name: "Ethen Becker", ID: 1, img: ``,}
                },
                {
                    Subject: "Mathematics",
                    Teacher: { name: "James Hinderesen", ID: 2, img: ``,}
                },
                {
                    Subject: "Physics",
                    Teacher: { name: "FD Signifier", ID: 1, img: ``,}
                },
            ]
        },
    ]
},
]
    const [isOpen, setIsOpen] = useState(false);
    return(
     <div>
        <div className='text-center z-0'>  
          <div className= 'z-20 text-center'>
              <HeadBan title={"Sections"}/>
          </div>
          
          <div className="flex flex-row gap-1 justify-between items-center p-2 mt-5 md:pl-[10rem] md:pr-[10rem]">
            {
              Sections.map((Section, index) => (
                <SecitonLocator ID={"SectionCard"+index} SectionCategoryName={Section.SectionCategory} key={index}/>
              ))
            }
            <button className="bg-[#5e469c] hover:bg-black rounded-[100%] flex justify-center items-center p-1 border-[#5e469c] hover:border-white border-[0.05rem]" onClick={()=> setIsOpen(true)}>
                <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                </svg>
            </button>
            <AddSection open={isOpen} onClose={()=> setIsOpen(false)}/>
          </div>

          <div className="flex flex-col justify-center items-center">
            {
              Sections.map((Section, index) => (
                <SectionCard Sec={Section} key={index} index={index}/>
              ))
            }
          </div>
        </div>   
      </div>
    )
}