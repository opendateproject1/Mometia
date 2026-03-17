export interface BlogPost {
  title: string
  slug: string
  description: string
  image: string
  createdAt: string
  author: string
  readTime: string
  category: string
}

export const blogs: BlogPost[] = [
  {
    title: 'Zero Trust Architecture: The Future of Enterprise Security',
    slug: '#blog-1',
    description:
      'Learn how Zero Trust principles eliminate implicit trust and protect your organization from advanced threats and insider attacks.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&h=360&fit=crop',
    createdAt: '2025-03-10',
    author: 'Security Team',
    readTime: '8 min read',
    category: 'Architecture',
  },
  {
    title: 'Cloud Security: Compliance and Defense Strategies',
    slug: '#blog-2',
    description:
      'Navigate the complexities of cloud security with practical strategies for achieving compliance while maintaining strong defense postures.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=640&h=360&fit=crop',
    createdAt: '2025-03-08',
    author: 'Cloud Security Lead',
    readTime: '7 min read',
    category: 'Cloud',
  },
  {
    title: 'Ransomware Trends 2025: Detection and Prevention',
    slug: '#blog-3',
    description:
      'Understand emerging ransomware tactics and implement proven detection and prevention strategies to protect your critical assets.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=640&h=360&fit=crop',
    createdAt: '2025-03-05',
    author: 'Threat Research',
    readTime: '9 min read',
    category: 'Threats',
  },
  {
    title: 'Penetration Testing Best Practices',
    slug: '#blog-4',
    description:
      'Maximize the value of penetration tests with proper planning, execution, and remediation strategies for continuous improvement.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=640&h=360&fit=crop',
    createdAt: '2025-02-28',
    author: 'Offensive Security',
    readTime: '10 min read',
    category: 'Testing',
  },
  {
    title: 'Identity and Access Management: The Foundation of Security',
    slug: '#blog-5',
    description:
      'Explore how strong IAM implementations provide the foundation for enterprise-wide security and compliance requirements.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=640&h=360&fit=crop',
    createdAt: '2025-02-25',
    author: 'Access Control Team',
    readTime: '6 min read',
    category: 'Identity',
  },
  {
    title: 'Security Incident Response: Building Your Playbook',
    slug: '#blog-6',
    description:
      'Create a comprehensive incident response plan that minimizes damage, ensures quick recovery, and strengthens your security posture.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=640&h=360&fit=crop',
    createdAt: '2025-02-20',
    author: 'Incident Response',
    readTime: '8 min read',
    category: 'Response',
  },
  {
    title: 'GRC Frameworks: Building Compliance Programs That Work',
    slug: '#blog-7',
    description:
      'Implement effective governance, risk, and compliance programs aligned with SOC 2, ISO 27001, and industry-specific requirements.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=640&h=360&fit=crop',
    createdAt: '2025-02-15',
    author: 'Compliance Team',
    readTime: '7 min read',
    category: 'Compliance',
  },
  {
    title: 'API Security: Protecting Your Modern Infrastructure',
    slug: '#blog-8',
    description:
      'Secure APIs with authentication, rate limiting, and monitoring strategies essential for cloud-native application protection.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=640&h=360&fit=crop',
    createdAt: '2025-02-10',
    author: 'API Security',
    readTime: '6 min read',
    category: 'API',
  },
  {
    title: 'Threat Intelligence: Turning Data Into Defense',
    slug: '#blog-9',
    description:
      'Leverage threat intelligence to stay ahead of attackers and make informed decisions about your security investments.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=360&fit=crop',
    createdAt: '2025-02-05',
    author: 'Threat Team',
    readTime: '8 min read',
    category: 'Intelligence',
  },
]
