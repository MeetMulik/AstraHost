
<p align="center">
  <img src="https://github.com/user-attachments/assets/c1931884-f8ec-4619-80a3-adfe55c15917" width="150px" alt="iBlog Logo">
</p>

<h1 align="center"> AstraHost 📟</h1>


AstraHost is your one-stop solution for deploying and managing React applications with ease. Just provide a GitHub repository link, and let AstraHost handle the rest, delivering a live link to your app along with comprehensive analytics.


## 🚀 Features

- **Effortless Deployment**: Deploy your React applications by simply providing a GitHub repository link.
- **Detailed Analytics**:
  - Total hits
  - Unique visitors
  - Processing time for the last 10 requests
  - Browser types
  - Day-wise total views
- **Scalable Architecture**: Built on a robust and scalable infrastructure using AWS and modern technologies.
- **Rate Limiting**: Protect your app with integrated rate limiting via Redis.

## 🎥 Demo Video

Check out our [demo video](https://www.loom.com/share/a2f1b50b45bd44d28a8bd7913667366b?sid=db79bb7e-2f61-4adf-af5d-95483c30d237) to see AstraHost in action!  


## 🛠️ How It Works

1. **User Submission**: Provide a GitHub repository link for your React application.
2. **Automated Build**: A Docker container spins up on AWS ECS, clones the repo, and creates a build-ready version.
3. **S3 Upload**: The build is uploaded to AWS S3, with logs sent to Kafka.
4. **Analytics Collection**: Logs are consumed from Kafka and stored in ClickHouse DB for analytics.
5. **Proxy Server**: Requests are routed based on subdomains, with request data sent to Kafka for further analysis.
6. **Rate Limiting**: Redis ensures rate limits are applied to protect your app.

## 🧰 Technologies Used

- **Frontend**: Next.js 14, Tailwind CSS, Shadcn UI
- **Backend**:
  - Docker, AWS ECS, AWS ECR, AWS S3
  - Kafka, Redis, ClickHouse DB
  - Custom Proxy Server

## 🖼️ Screenshots

![image](https://github.com/user-attachments/assets/f77e9856-4878-4478-a589-e01b43d629b9)


## 📚 Getting Started

### Prerequisites

- Docker
- AWS Account with ECS, ECR, S3, and Kafka services enabled
- Redis
- ClickHouse DB
- PostgreSQL
