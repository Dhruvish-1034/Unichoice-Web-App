import { React, useState } from "react";
import unilogo from "../../image/uni-logo.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { BiAddToQueue } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { GoTrophy } from "react-icons/go";
import Accordion from "react-bootstrap/Accordion";
import { PiOfficeChairBold } from "react-icons/pi";
import { TbCoins } from "react-icons/tb";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { HiMiniDocumentCheck } from "react-icons/hi2";

function UniversityDetailPage() {
  const [isActive, setIsActive] = useState("admissionInformation");

  return (
    <div>
      <div
        style={{
          backgroundImage: `url("https://media.istockphoto.com/id/1418960998/photo/black-fabric.webp?b=1&s=170667a&w=0&k=20&c=7ys2K0OPpmJt4l5OoD_XHn0-XpNIRsa6yRSFirrzhRU=")`,
        }}
        className="sm:flex justify-center items-center sm:h-[40vh] block h-max pt-10 sm:pt-0"
      >
        <img src={unilogo} className="h-[12vh] sm:mb-[10vh]" alt="" />
        <div className="text-white">
          <div className="ml-2">
            <p className="text-[24px] mt-[10px]">
              New LJ Institute of Engineering and Technology
            </p>
            <div className="flex">
              <IoLocationOutline className="mt-1" />
              <p className="mb-[50px]">Ahmedabad,Gujarat,India</p>
            </div>
            <div className="flex pr-2 ">
              <button type="button" className="flex border px-2 py-1.5">
                <BiAddToQueue className="mt-1.5 mr-2" />
                <p>Compare</p>
              </button>
              <button type="button" className="flex border px-2 py-1.5 ml-4">
                <CiHeart className="mt-1.5 mr-2" />
                <p>Shortlist</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 mb-4">
        <div className="w-8/12 h-[10vh] items-center flex justify-center mx-[8vh]">
          <GoTrophy className="text-3xl mt-2 mx-4" />
          <div>
            <p className="text[14px]">#100</p>
            <p>University Ranking</p>
          </div>
        </div>
      </div>
      <div className="flex sm:mx-[10vh] mx-4">
        <div className="lg:px-[10vh] lg:w-4/12 hidden lg:block">
          <ul className="list-none leading-10 border rounded pl-2 sticky top-14">
            <li>Overview</li>
            <li>University Information</li>
            <li>Tution Fee and Scholarships</li>
            <li>Rankings and Ratings</li>
            <li>Campus Location</li>
          </ul>
        </div>
        <div className="lg:px-[2vh] lg:w-8/12 w-full ">
          <div>
            <p className="font-bold py-[10px] text-[22px]">
              About New LJ Institute of Engineering and Technology
            </p>
            <p>
              New L J Institute of Engineering and Technology (NLJIET) is an
              AICTE approved and GTU affiliated academic institution
              specifically dedicated to Computer Science and Engineering,
              Computer Science and Engineering (specialisation in Artificial
              Intelligence and Machine Learning) branch. The New LJIET is the
              Engineering Institute that has emphasized upon the digital
              revolution by including the specialization features. It is
              situated in the heart of the Ahmedabad city in the prime location
              adjacent to Sindhu Bhavan Road. New LJIET is the result of vision
              by well known educationist Principal B. M Peerzada, of dynamism of
              its Vice President Prof. Manishbhai Shah and of precision of Shri
              Girishbhai Patel. New LJIET is very well focused on providing best
              quality education by teaching theoretical aspects along with
              practical hands on learning. Here the students will not only study
              the engineering curriculum designed by the university, but also
              they will learn to develop the application programs to solve real
              world problems ,they will learn the implementation of core
              engineering components along with a specialisation approach, they
              will undergo a complete training to bridge the gap between the
              industrial requirement and skill sets and will explore the
              emerging technologies . New LJIET encourages its students to
              participate in curricular, extracurricular, hackathon events and
              state as well as national competitions. The Institute’s aim is to
              enhance the learning beyond conventional teaching, which will
              result in increment of student’s knowledge quotient and will boost
              their career growth.
            </p>
          </div>
          <hr className="my-10" />
          <div>
            <p className="font-bold text-[22px]">University Information</p>
            <div className="flex my-10">
              <button
                type="button"
                onClick={() =>
                  setIsActive((value) => (value = "admissionInformation"))
                }
                className="px-6"
              >
                ADMISSION
              </button>
              <button
                type="button"
                onClick={() =>
                  setIsActive((value) => (value = "staffInformation"))
                }
                className="px-6"
              >
                STUDENTS & STAFF
              </button>
              <hr />
            </div>
            {isActive === "admissionInformation" && (
              <div>
                <Accordion defaultActiveKey={["0"]} alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      NEW LJ BTech Admission 2024
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>
                        L.J. Institute of Engineering and Technology (L.J.I.E.T)
                        offers a Full Time BE/BTech programme that lasts 4
                        years. It is available in 10 specializations. To be
                        admitted to this course, eligible candidates must have a
                        valid score in the JEE Main exam. More details such as
                        the eligibility, accepted entrance exam, fee and seats
                        of L.J. Institute of Engineering and Technology
                        (L.J.I.E.T) BE/BTech programme are as follows:
                      </p>
                      <div className="lg:flex lg:my-8 lg:justify-around block border my-4">
                        <div className="flex justify-between lg:my-3 border px-4 py-2 lg:w-4/12 w-full ">
                          <div className="flex ">
                            <PiOfficeChairBold className="text-2xl mr-2" />
                            <p>Seat Intack</p>
                          </div>
                          <div>
                            <p>1800</p>
                          </div>
                        </div>
                        <div className="flex justify-between lg:my-3 border px-4 py-2 lg:w-4/12 w-full ">
                          <div className="flex ">
                            <TbCoins className="text-2xl mr-2" />
                            <p>Total Tuition Fees</p>
                          </div>
                          <div>
                            <p>₹ 2.9L</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex">
                          <BsFillPersonCheckFill className=" text-xl" />
                          <p className="font-bold text-[14px] pl-2">
                            Eligibility Criteria
                          </p>
                        </div>
                        <ul className="list-disc pl-5">
                          <li>10+2 with 45% aggregate</li>
                          <li>
                            Accepting Exams:
                            <span className="font-bold">JEE Main, GUJCET</span>
                          </li>
                        </ul>
                      </div>
                      <div className="my-4">
                        <div className="flex">
                          <HiMiniDocumentCheck className="text-xl" />
                          <p>Cut-offs</p>
                        </div>
                        <table class="table border-separate border-spacing-4">
                          <thead>
                            <tr>
                              <th className="border  border-slate-600">
                                Courses
                              </th>
                              <th className="border  border-slate-600">2023</th>
                              <th className="border  border-slate-600">2024</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>B.E. in Computer Engineering</td>
                              <td>4853</td>
                              <td>3759</td>
                            </tr>
                            <tr>
                              <td>B.E. in Information Technology</td>
                              <td>6045</td>
                              <td>5155</td>
                            </tr>
                            <tr>
                              <td>
                                B.Tech. in Artificial Intelligance and Data
                                Science
                              </td>
                              <td>-/-</td>
                              <td>8711</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      NEW LJ MTech Admission 2024
                    </Accordion.Header>
                    <Accordion.Body></Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            )}
            {isActive === "staffInformation" && (
              <div className="grid md:grid-cols-3 grid-cols-1 lg:mx-0 ml-14">
                <div>
                  <p>Total Students</p>
                  <p className="font-bold">11,731</p>
                  <div class="mt-4 mb-4 w-9/12 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded"
                      style={{ width: 75 }}
                    ></div>
                  </div>
                  <div className="flex justify-between w-9/12">
                    <div>
                      <p>UG Students</p>
                      <p>39%</p>
                    </div>
                    <div>
                      <p>PG Students</p>
                      <p>61%</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p>Student/Facult Ratio</p>
                  <p className="font-bold">21</p>
                  <div class="mt-4 mb-4 w-9/12 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded"
                      style={{ width: 75 }}
                    ></div>
                  </div>
                  <div className="flex justify-between w-9/12">
                    <div>
                      <p>UG Students</p>
                      <p>39%</p>
                    </div>
                    <div>
                      <p>PG Students</p>
                      <p>61%</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p>Total Faculty staff</p>
                  <p className="font-bold">2,925</p>
                  <div class="mt-4 mb-4 w-9/12 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded"
                      style={{ width: 75 }}
                    ></div>
                  </div>
                  <div className="flex justify-between w-9/12">
                    <div>
                      <p>UG Students</p>
                      <p>39%</p>
                    </div>
                    <div>
                      <p>PG Students</p>
                      <p>61%</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-[22px] mt-[10vh]">
              Tuition fee and scholarships
            </p>
            <p className="mb-4">
              One of the important factors when considering a master's degree is
              the cost of study. Luckily, there are many options available to
              help students fund their master's programme. Download your copy of
              the Scholarship Guide to find out which scholarships from around
              the world could be available to you, and how to apply for them.
            </p>
          </div>
          <div className="mb-6">
            <p className="font-bold text-[22px]">Ranking & Review</p>
            <div className="mt-4">
              <button type="button" className="px-6">
                RANKING
              </button>
              <button type="button" className="px-6">
                REVIEW
              </button>
            </div>
          </div>
          <div className="mt-10">
            <p className="font-bold text-[22px]">Campus Loaction</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversityDetailPage;
