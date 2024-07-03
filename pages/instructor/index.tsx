import { FaStar, FaMoneyBill } from 'react-icons/fa';
import { PiStudentFill } from 'react-icons/pi';
import { MdOutlineRateReview } from 'react-icons/md';
import { Progress } from 'antd';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import InstructorLayout from '@/components/layout/instructor-layout';
import { PaymentTable } from '@/components/table/payment-table';
import { TopCourseIncomeTable } from '@/components/table/top-course-income-table';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useInstructorDashboard from '@/hooks/fetch-data/useInstructorDashboard';

export default function InstructorDashboard() {
  const { dashboard, isLoading } = useInstructorDashboard();

  return (
    <div className="grow flex justify-center items-center overflow-scroll">
      <div className="flex flex-col gap-5 w-[95%] h-[95%]">
        <div className="px-10 flex flex-col gap-8">
          <Heading className="!font-medium">Dashboard</Heading>
          {dashboard && (
            <div className="flex gap-5 mb-[20px]">
              <div className="w-[38%] flex justify-between flex-wrap gap-5">
                <div className="flex items-center px-7 gap-4 w-[48%] h-[120px] bg-white-primary rounded-lg shadow-md">
                  <div className="bg-teal-100 px-3 py-3 rounded-full">
                    <PiStudentFill className="w-9 h-9 text-teal-secondary" />
                  </div>
                  <div className="flex flex-col">
                    <Text size="xl" className="!font-medium !text-gray-800">
                      {dashboard.data?.totalStudents}
                    </Text>
                    <Text size="sm">Total Students</Text>
                  </div>
                </div>
                <div className="flex items-center px-7 gap-4 w-[48%] h-[120px] bg-white-primary rounded-lg shadow-md">
                  <div className="bg-cyan-100 px-4 py-4 rounded-full">
                    <MdOutlineRateReview className="w-[31px] h-[31px] text-cyan-500" />
                  </div>
                  <div className="flex flex-col">
                    <Text size="xl" className="!font-medium !text-gray-800">
                      {dashboard.data?.totalReviews}
                    </Text>
                    <Text size="sm">Total Reviews</Text>
                  </div>
                </div>
                <div className="flex items-center px-7 gap-4 w-[48%] h-[120px] bg-white-primary rounded-lg shadow-md">
                  <div className="bg-yellow-100 px-4 py-4 rounded-full">
                    <FaStar className="w-7 h-7 text-yellow-400" />
                  </div>
                  <div className="flex flex-col">
                    <Text size="xl" className="!font-medium !text-gray-800">
                      {dashboard.data?.averageRating}
                    </Text>
                    <Text size="sm">Average Rating</Text>
                  </div>
                </div>
                <div className="flex items-center px-7 gap-4 w-[48%] h-[120px] bg-white-primary rounded-lg shadow-md">
                  <div className="bg-emerald-100 px-4 py-4 rounded-full">
                    <FaMoneyBill className="w-7 h-7 text-emerald-500" />
                  </div>
                  <div className="flex flex-col">
                    <Text size="xl" className="!font-medium !text-gray-800">
                      ${dashboard.data?.totalIncome ? dashboard.data?.totalIncome : 0}
                    </Text>
                    <Text size="sm">Total Income</Text>
                  </div>
                </div>
                <div className="flex flex-col w-[100%] h-[300px] max-h-[300px] gap-2 bg-white-primary rounded-lg shadow-md px-5 py-4">
                  <Heading className="!font-medium !text-[15px] text-gray-800">Course Statistics</Heading>
                  {dashboard.data?.totalCourses ? (
                    <>
                      <Text size="sm" className="mx-auto !font-medium !text-gray-800">
                        Total: {dashboard.data?.totalCourses} courses
                      </Text>
                      <div className="flex justify-around">
                        <div className="flex flex-col gap-2">
                          <Progress
                            size={[130, 130]}
                            strokeColor="#3b82f6"
                            type="circle"
                            percent={Number(((dashboard.data.numberOfPublishedCourses * 100) / dashboard.data.totalCourses).toFixed(2))}
                          />
                          <Text size="sm" className="inline-flex items-center gap-2 mt-1">
                            <div className="w-[16px] h-[16px] rounded-md bg-blue-500"></div>Published
                          </Text>
                          <Text size="sm" className="inline-flex items-center gap-2">
                            <div className="w-[16px] h-[16px] rounded-md bg-gray-200"></div>In Progress
                          </Text>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Progress
                            size={[130, 130]}
                            strokeColor="#14b8a6"
                            type="circle"
                            percent={Number(((dashboard.data.numberOfPaidCourses * 100) / dashboard.data.totalCourses).toFixed(2))}
                          />
                          <Text size="sm" className="inline-flex items-center gap-2 mt-1">
                            <div className="w-[16px] h-[16px] rounded-md bg-teal-500"></div>Paid
                          </Text>
                          <Text size="sm" className="inline-flex items-center gap-2">
                            <div className="w-[16px] h-[16px] rounded-md bg-gray-200"></div>Free
                          </Text>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <Text className="text-[15px]">No data</Text>
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-[100%] h-[300px] max-h-[300px] gap-3 bg-white-primary rounded-lg shadow-md px-5 py-4 overflow-scroll">
                  <Heading className="!font-medium !text-[15px] text-gray-800">Top highest income courses</Heading>
                  {dashboard.data?.topIncomeCourses.length ? (
                    <TopCourseIncomeTable data={dashboard.data?.topIncomeCourses} />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <Text className="text-[15px]">No data</Text>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-[60%] flex flex-col gap-5">
                <div className="flex flex-col w-[100%] h-[445px] max-h-[445px] bg-white-primary rounded-lg shadow-md px-5 py-4">
                  <Heading className="!font-medium !text-[15px] text-gray-800">Income Per Month</Heading>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={500} height={300} data={dashboard.data?.incomeEachMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis  />
                      <Tooltip />
                      <Legend verticalAlign="top" height={50} />
                      <Bar dataKey="income" fill="#0ea5e9" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col w-[100%] h-[445px] max-h-[445px] gap-2 bg-white-primary rounded-lg shadow-md px-5 py-4">
                  <Heading className="!font-medium !text-[15px] text-gray-800">Payment List</Heading>
                  {dashboard.data?.paymentList.length ? (
                    <PaymentTable data={dashboard.data?.paymentList} />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <Text className="text-[15px]">No data</Text>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

InstructorDashboard.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
