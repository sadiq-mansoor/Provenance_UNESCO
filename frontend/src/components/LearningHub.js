import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Pause,
  BookOpen, 
  Video, 
  ExternalLink, 
  Clock, 
  Target,
  CheckCircle,
  ArrowRight,
  Youtube,
  Brain,
  Headphones,
  Star,
  Bookmark,
  Newspaper,
  Download,
  Sparkles,
  Microscope,
  X
} from 'lucide-react';

const LearningHub = () => {
  const [activeTab, setActiveTab] = useState('training');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPodcastId, setCurrentPodcastId] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePodcastPlay = (podcast) => {
    if (!podcast.audioFile) return;

    // If same podcast is playing, toggle play/pause
    if (currentPodcastId === podcast.id && currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
      } else {
        currentAudio.play();
        setIsPlaying(true);
      }
      return;
    }

    // Stop current audio if playing
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Create new audio instance
    const audio = new Audio(podcast.audioFile);
    
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentPodcastId(null);
      setCurrentAudio(null);
      setAudioProgress(0);
      setCurrentTime(0);
    });
    
    // Track audio progress
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
      setAudioProgress((audio.currentTime / audio.duration) * 100);
    });
    
    // Get duration when loaded
    audio.addEventListener('loadedmetadata', () => {
      setAudioDuration(audio.duration);
    });

    setCurrentAudio(audio);
    setCurrentPodcastId(podcast.id);
    setAudioProgress(0);
    setCurrentTime(0);
    audio.play();
  };

  const handleSeek = (e) => {
    if (!currentAudio) return;
    
    const progressBar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = progressBar.offsetWidth;
    const percentage = clickX / width;
    const newTime = percentage * currentAudio.duration;
    
    currentAudio.currentTime = newTime;
    setCurrentTime(newTime);
    setAudioProgress(percentage * 100);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const tabs = [
    { 
      id: 'training', 
      label: 'Training', 
      icon: Brain, 
       color: 'violet',
      description: 'Interactive quizzes and exercises'
    },
    { 
      id: 'videos', 
      label: 'Videos', 
      icon: Video, 
       color: 'violet',
      description: 'Educational video content' 
    },
    { 
      id: 'podcasts', 
      label: 'Podcasts', 
      icon: Headphones, 
       color: 'violet',
      description: 'Expert discussions and interviews'
    },
    { 
      id: 'stories', 
      label: 'Stories', 
      icon: Newspaper, 
       color: 'violet',
      description: 'Case studies and real examples'
    }
  ];

  const trainingContent = [
    {
      id: 1,
      title: 'Advanced Media Literacy Quiz',
      description: 'Test your skills with expert-level questions on deepfakes, AI content, and psychological manipulation.',
      type: 'Interactive Quiz',
      duration: '15-20 min',
      difficulty: 'Expert',
      questions: 12,
      completionRate: '73%',
      points: 300,
      link: '/quiz',
      features: ['Multi-select questions', 'Real-time scoring', 'Skill breakdown', 'Video analysis'],
      icon: Brain,
       color: 'from-violet-500 to-electric-500',
      stats: {
        'Questions:': 12,
        'Max Points:': 300,
        'Completion Rate:': '73%'
      }
    },
    {
      id: 2,
      title: 'Forensic Detection Lab',
      description: 'Hands-on forensic analysis laboratory with 5-6 professional detection tools. Each exercise provides real vs. fake media samples, real-time analysis results, and precision-based scoring for accurate classification.',
      type: 'Interactive Lab',
      duration: '30-40 min',
      difficulty: 'Expert',
      exercises: 6,
      testFiles: 12,
      points: 200,
      link: '/forensic-lab',
      features: ['Metadata Inspector', 'Error Level Analysis', 'Spectrogram Tool', 'AI Classifier Demo', 'Compression Artifact Viewer', 'Real-time Results'],
      icon: Microscope,
       color: 'from-violet-500 to-electric-500',
      stats: {
        'Detection Tools:': 6,
        'Test Files:': '12 (6 real, 6 fake)',
        'Precision Scoring:': 'Active'
      }
    },
    {
      id: 3,
      title: 'Bias Detection Workshop',
      description: 'Learn to identify cognitive biases and psychological manipulation in news and social media.',
      type: 'Workshop',
      duration: '25-30 min',
      difficulty: 'Intermediate',
      scenarios: 8,
      points: 150,
      status: 'Coming Soon',
      features: ['Bias scenarios', 'Psychology insights', 'Self-assessment', 'Improvement tips'],
      icon: Target,
       color: 'from-violet-500 to-electric-500'
    }
  ];

  const videosContent = [
    {
      id: 'cSKGa_7XJkg',
      title: 'How false news can spread',
      speaker: 'Noah Tavlin',
      platform: 'TED-Ed',
      duration: '4:58',
      views: '8.2M',
      difficulty: 'Beginner',
      featured: true,
      description: 'Learn how false news spreads faster than real news and what psychological factors make misinformation so compelling and viral.',
      thumbnailUrl: 'https://img.youtube.com/vi/cSKGa_7XJkg/maxresdefault.jpg',
      embedUrl: 'https://www.youtube.com/embed/cSKGa_7XJkg',
      keyTopics: ['Psychology of misinformation', 'Viral spread patterns', 'Confirmation bias', 'Social media amplification'],
      learningObjectives: [
        'Understand the mechanics of false news spread',
        'Recognize psychological vulnerabilities',
        'Identify viral misinformation patterns',
        'Develop critical thinking defenses'
      ]
    },
    {
      id: 'q-Y-z6HmRgI',
      title: 'How to choose your news',
      speaker: 'Damon Brown',
      platform: 'TED-Ed',
      duration: '4:47',
      views: '2.1M',
      difficulty: 'Beginner',
      description: 'Essential skills for evaluating news sources and avoiding misinformation.',
      thumbnailUrl: 'https://img.youtube.com/vi/q-Y-z6HmRgI/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=q-Y-z6HmRgI'
    },
    {
      id: 'E91bGT9BjYk',
      title: 'How to spot a misleading graph',
      speaker: 'Lea Gaslowitz',
      platform: 'TED-Ed',
      duration: '4:46',
      views: '1.8M',
      difficulty: 'Intermediate',
      description: 'Learn to identify manipulative data visualization techniques.',
      thumbnailUrl: 'https://img.youtube.com/vi/E91bGT9BjYk/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=E91bGT9BjYk'
    }
  ];

  const podcastsContent = [
    {
      id: 1,
      title: 'The Psychology of Misinformation',
      host: 'Provenance',
      platform: 'Media Literacy Podcast',
      duration: '45:32',
      episode: 'Episode 127',
      description: 'Deep dive into the psychological mechanisms that make people susceptible to false information.',
      topics: ['Cognitive biases', 'Emotional manipulation', 'Social proof', 'Authority figures'],
      releaseDate: '2025-01-15',
      downloads: '0',
      rating: 0,
      audioFile: '/images/podcast/Beyond_Fake_News__Mastering_Your_Mind_s_Defenses_Against_Misinformation.m4a'
    },
    {
      id: 2,
      title: 'ڈیپ فیکس کا دور: ڈیجیٹل سچ اور فریب کی جنگ میں اصل کی پہچان کیسے کریں؟',
      host: 'Provenance',
      platform: 'Media Literacy Podcast',
      duration: '38:15',
      episode: 'Episode 128',
      description: 'ڈیپ فیکس اور AI سے بنائے گئے مواد کی شناخت کے طریقے اور ڈیجیٹل تصدیق کا مستقبل۔',
      topics: ['AI detection', 'Digital watermarks', 'Deepfakes', 'Digital authentication'],
      releaseDate: '2025-01-16',
      downloads: '0',
      rating: 0,
      audioFile: '/images/podcast/ڈیپ_فیکس_کا_دور__ڈیجیٹل_سچ_اور_فریب_کی_جنگ_میں_اصل_کی_پہچان_کیسے_کریں؟.m4a'
    },
    {
      id: 3,
      title: 'Breaking the Algorithmic Echo Chamber: How to Dismantle Your Digital Walls',
      host: 'Provenance',
      platform: 'Media Literacy Podcast',
      duration: '52:18',
      episode: 'Episode 129',
      description: 'Learn how to break free from algorithmic filter bubbles and echo chambers that limit your information diversity and critical thinking.',
      topics: ['Algorithm design', 'Filter bubbles', 'Echo chambers', 'Information diversity', 'Critical thinking', 'Digital literacy'],
      releaseDate: '2025-01-17',
      downloads: '0',
      rating: 0,
      audioFile: '/images/podcast/Breaking_the_Algorithmic_Echo_Chamber__How_to_Dismantle_Your_Digital_Walls.m4a'
    }
  ];

  const storiesContent = [
    {
      id: 'maya-story',
      title: 'Maya and the Truth Compass',
      category: 'Interactive Story',
      type: 'video',
      duration: '5-8 min',
      difficulty: 'Beginner',
      featured: true,
      description: 'Join Maya on her journey to discover the Truth Compass and learn how to navigate the digital world with confidence. An engaging story that introduces the fundamentals of media literacy.',
      keyLessons: ['Digital literacy basics', 'Critical thinking', 'Source verification', 'Truth detection'],
      author: 'Provenance Education Team',
      publishDate: '2025-01-20',
      tags: ['Interactive', 'Beginner Friendly', 'Story-based Learning', 'Youth Education'],
      videoPath: '/images/maya-truth-compass.mp4',
       thumbnail: '/images/fake-news-keyboard.jpg' // Use static image as thumbnail
    },
    {
      id: 1,
      title: 'The Great Twitter Hack of 2020',
      category: 'Case Study',
      readTime: '8 min',
      difficulty: 'Intermediate',
      description: 'How social engineering and insider threats led to one of the biggest social media security breaches.',
      keyLessons: ['Social engineering tactics', 'Insider threats', 'Verification importance', 'Crisis response'],
      author: 'Provenance MLP',
      publishDate: '2024-12-15',
      tags: ['Social Engineering', 'Platform Security', 'Verification'],
      content: `
        <h2>Insider Threats and the 2020 Twitter Hack: A Detailed Briefing</h2>
        
        <h3>Executive Summary</h3>
        <p>Insider threats represent a multifaceted and growing risk to organisations across all sectors. These threats originate from individuals with authorised access to a company's resources and can be either malicious (intentional harm) or negligent (unintentional harm). The 2020 Twitter account hijacking serves as a stark example of how social engineering tactics, targeting insider vulnerabilities, can lead to significant data breaches, financial loss, reputational damage, and even broader societal risks to financial markets, elections, and national security. This briefing reviews the definition, types, and manifestations of insider threats, with a particular focus on the 2020 Twitter hack as a critical case study, and outlines essential mitigation strategies.</p>
        
        <h3>1. Defining Insider Threats</h3>
        <p>According to the Cybersecurity and Infrastructure Security Agency (CISA), an "insider threat is the threat that an insider will use their authorized access, intentionally or unintentionally, to do harm to the department's mission, resources, personnel, facilities, information, equipment, networks, or systems." An "insider" is broadly defined as "any person who has or had authorized access to or knowledge of an organization's resources, including personnel, facilities, information, equipment, networks, and systems." This can encompass employees, partners, vendors, interns, suppliers, contractors, and even repair personnel.</p>
        
        <p>The harm caused by insider threats can include:</p>
        <ul>
          <li><strong>Malicious acts:</strong> Intentional actions to damage an organisation, such as espionage, sabotage, theft, unauthorised disclosure of information, corruption, or workplace violence.</li>
          <li><strong>Complacent or unintentional acts:</strong> Careless behaviours that expose an organisation to risk, such as negligence or accidental data leaks.</li>
        </ul>
        
        <h3>2. Types of Insider Threats</h3>
        <p>While often categorised simply as malicious or negligent, a more nuanced classification reveals several distinct types of insider threats:</p>
        
        <ul>
          <li><strong>Departing employees:</strong> These individuals, leaving voluntarily or involuntarily, might take company materials for a new job or, more maliciously, steal and expose sensitive data out of revenge.</li>
          <li><strong>Malicious insiders:</strong> Current employees who, driven by grievances, alter or delete crucial data, disclose secret information, or engage in other forms of sabotage.</li>
          <li><strong>Negligent workers:</strong> These employees unintentionally jeopardise the organisation through poor security hygiene, such as weak passwords, lack of multi-factor authentication (MFA), or allowing others to use their work devices. "Human error is one of the leading causes of data breaches and cyberattacks, contributing to 95% of data breaches."</li>
          <li><strong>Security evaders:</strong> Workers who bypass security policies for convenience, increasing the risk of a data breach.</li>
          <li><strong>Inside agents:</strong> Individuals who act on behalf of external groups, either knowingly (through blackmail or bribery) or unknowingly (through social engineering deception).</li>
          <li><strong>Third-party partners:</strong> External parties like suppliers, contractors, and vendors who have some level of inside access and can pose similar risks to employees.</li>
        </ul>
        
        <h3>3. The 2020 Twitter Account Hijacking: A Case Study in Social Engineering and Insider Threat</h3>
        <p>The 2020 Twitter account hijacking, described by cybersecurity expert Dmitri Alperovitch as "the worst hack of a major social media platform yet," perfectly illustrates the dangers of insider threats exploited through social engineering.</p>
        
        <h4>3.1. Incident Overview</h4>
        <p>On July 15, 2020, between 20:00 and 22:00 UTC, "69 high-profile Twitter accounts were compromised by outside parties to promote a bitcoin scam." Accounts belonging to prominent figures like Barack Obama, Joe Biden, Bill Gates, Elon Musk, and companies such as Apple and Uber, were used to tweet a "double your bitcoin" scam, soliciting cryptocurrency donations with a promise of doubling the return. This "smash and grab" operation resulted in "bitcoins to a value of more than US$110,000" being deposited.</p>
        
        <h4>3.2. Method of Attack: Social Engineering</h4>
        <p>The attackers did not employ "any of the high-tech or sophisticated techniques often used in cyberattacks – no malware, no exploits, and no backdoors." Instead, they leveraged social engineering, particularly "vishing" (voice phishing), targeting Twitter employees.</p>
        
        <p>The attack unfolded in three phases:</p>
        <ol>
          <li><strong>Stealing Credentials through Social Engineering:</strong> The hackers "called several Twitter employees and claimed to be calling from the Help Desk in Twitter's IT department." They exploited the fact that "VPN problems were common at Twitter" due to the shift to remote working during the COVID-19 pandemic. They directed employees to a fake internal VPN website to steal credentials and bypass MFA by simultaneously entering stolen credentials into the real Twitter VPN and asking the employees for the MFA code.</li>
          <li><strong>Stealing "OG" Twitter Accounts:</strong> Initially, the hackers focused on "original gangster" (OG) usernames, which are highly coveted and can be sold for significant amounts. This demonstrated their access to Twitter's internal systems.</li>
          <li><strong>The High-Profile Bitcoin Scam:</strong> Escalating the attack, the hackers targeted "verified" accounts, knowing that tweets from these accounts would lend credibility to their fraudulent demands. They first compromised cryptocurrency-related accounts before moving on to high-profile individuals and companies, reaching millions of potential victims.</li>
        </ol>
        
        <p>Twitter later confirmed that "The attackers successfully manipulated a small number of employees and used their credentials to access Twitter's internal systems, including getting through our two-factor protections."</p>
        
        <h4>3.3. Contributing Cybersecurity Weaknesses at Twitter</h4>
        <p>The success of the Twitter Hack was largely attributed to several internal cybersecurity weaknesses:</p>
        
        <ul>
          <li><strong>Lack of Strong Leadership:</strong> Twitter had been without a Chief Information Security Officer (CISO) for seven months prior to the attack, indicating a lack of senior-level engagement and prioritisation of cybersecurity.</li>
          <li><strong>Vulnerability to Social Engineering:</strong> The company's employees were susceptible to sophisticated social engineering tactics that played on their trust and the new challenges of remote work. "Social engineering is the use of deception to manipulate individuals into divulging confidential or personal information which is later used for fraudulent purposes."</li>
          <li><strong>Failure to Address Remote Working Vulnerabilities:</strong> The rapid transition to mass remote working due to the COVID-19 pandemic created new security challenges that Twitter "did not implement any significant compensating controls" to mitigate.</li>
          <li><strong>Inadequate Access Management and Authentication:</strong> While Twitter had some access controls, "over 1,000 Twitter employees still had access to them for job functions and duties such as Twitter user account maintenance and support." The application-based MFA used was also circumvented, highlighting the need for stronger methods like physical security keys.</li>
          <li><strong>Insufficient Employee Education and Training:</strong> Despite the prevalence of social engineering, Twitter's employees were not adequately prepared to recognise and resist these attacks.</li>
          <li><strong>Weak Security Monitoring:</strong> A robust security monitoring program, including Security Information and Event Management (SIEM) systems, could have detected the anomalous activity in near real-time, allowing for a quicker response.</li>
        </ul>
        
        <h4>3.4. Impact and Aftermath</h4>
        <p>Beyond the financial losses from the bitcoin scam, the Twitter hack had significant implications:</p>
        
        <ul>
          <li><strong>Exposure of Nonpublic Information:</strong> "130 Twitter user accounts were compromised," with "45 accounts were used to send tweets." Account data for eight non-verified accounts was downloaded, and direct messages for "up to 36" accounts were accessed, including that of a Dutch Parliament Representative.</li>
          <li><strong>Disruption of Critical Communications:</strong> Twitter temporarily disabled tweeting for many verified accounts, affecting essential communications, such as "the National Weather Service could not tweet a tornado advisory."</li>
          <li><strong>Reputational Damage and Investor Concern:</strong> The incident caused Twitter, Inc.'s stock price to fall and severely damaged the brand's security reputation.</li>
          <li><strong>Societal Risks:</strong> Security experts expressed concern about the hack's potential to "affect the use of social media in important online discussions, including the lead-up into the 2020 United States presidential election," and cause "confusion, havoc and political mischief." The incident underscored the "central role [Twitter] plays in how we communicate and how news is spread."</li>
          <li><strong>Legal and Regulatory Scrutiny:</strong> The FBI launched an investigation, and the incident prompted calls for increased cybersecurity oversight of large social media companies.</li>
        </ul>
        
        <h3>4. Mitigating Insider Threats</h3>
        <p>Effective insider threat mitigation requires a holistic approach combining physical security, personnel awareness, and information-centric principles. Key steps include:</p>
        
        <ul>
          <li><strong>Defining Insider Threats:</strong> A clear understanding of what constitutes an insider threat is the first step in building a mitigation program.</li>
          <li><strong>Detecting and Identifying Insider Threats:</strong> This involves both human observation of concerning behaviours and technological monitoring of data movement. Solutions like Mimecast Incydr can "automatically detect data leaks to untrusted cloud apps, blocks unacceptable exfiltrations, and tailors security's response."</li>
          <li><strong>Assessing Insider Threats:</strong> Evaluating the interest, motive, and ability of a person of concern to carry out a harmful act.</li>
          <li><strong>Managing Insider Threats:</strong> Proactive measures to monitor, manage, and mitigate the risk of harmful actions, including continuous monitoring and automated responses.</li>
        </ul>
        
        <h4>4.1. Cybersecurity Best Practices (General)</h4>
        <ul>
          <li><strong>Leadership:</strong> Establish a strong cybersecurity culture from the top, with a dedicated CISO and sufficient independence to implement robust protocols.</li>
          <li><strong>Access Management and Authentication:</strong> Implement strict "least privilege" access controls, ensuring users only have access necessary for their job roles. Mandate stronger authentication, such as physical security keys, for high-risk applications and functions.</li>
          <li><strong>Employee Education and Training:</strong> Conduct regular cybersecurity awareness training, including social engineering techniques like phishing and vishing. This should also include uniform communication standards and methods for reporting suspicious activity.</li>
          <li><strong>Security Monitoring:</strong> Implement robust Security Information and Event Management (SIEM) systems to log, aggregate, analyse, and correlate security information, identifying anomalous activity and insider threats in near real-time.</li>
          <li><strong>Secure Devices and Digital Footprint:</strong> Keep anti-malware and anti-virus software updated, regularly patch software and firmware, avoid administrator mode for daily use, use unique and strong passwords with MFA for all critical accounts, and be mindful of over-sharing personal information online.</li>
        </ul>
        
        <h4>4.2. Best Practices for Cryptocurrency Companies (Specific)</h4>
        <p>The New York State Department of Financial Services (DFS) identified several best practices for cryptocurrency companies following the Twitter hack, many of which are applicable to other industries:</p>
        
        <ul>
          <li><strong>Block Cryptocurrency Addresses Associated with Scammers:</strong> Proactively identify and quickly block fraudulent addresses.</li>
          <li><strong>Restrict Transfers to Pre-Approved Addresses (Safelisting):</strong> Where practical, limit transfers to a list of pre-approved addresses. For larger transfers, implement additional controls like MFA or transfer delays.</li>
          <li><strong>Improve Marketing of Legitimate Promotions:</strong> Ensure promotions are clearly distinguishable from scams and accompanied by verification information.</li>
          <li><strong>Educate Consumers About Spotting Scams:</strong> Regularly update customers on identified and potential risks.</li>
          <li><strong>Conduct Scam Monitoring:</strong> Actively monitor for patterns and trends in fraudulent activity, such as "romance" attacks, and coordinate with law enforcement and regulators.</li>
          <li><strong>Share Information with Other Companies:</strong> Participate in information-sharing groups to stay updated on attacks and mitigation strategies.</li>
        </ul>
        
        <h3>5. Call for Expanded Oversight of Social Media Companies</h3>
        <p>The Twitter Hack highlighted a significant regulatory gap: "Social media companies currently have no dedicated regulator." Given their immense influence on "financial markets, elections, and national security," the report by the New York State Department of Financial Services calls for a new regulatory framework.</p>
        
        <p>Key recommendations include:</p>
        <ul>
          <li><strong>Cybersecurity Regulation for Large Social Media Companies:</strong> Implement comprehensive, risk-based cybersecurity regulations, similar to those in the financial services industry, but "more detailed and require more security in high-risk areas."</li>
          <li><strong>Designation of "Systemically Important" Social Media Companies:</strong> Establish an "analogue to the FSOC [Financial Stability Oversight Council]" to identify companies whose misuse could pose systemic risks to society.</li>
          <li><strong>New Expert Regulator:</strong> Create a dedicated, expert agency to oversee the cybersecurity of designated "systemically important" social media companies, potentially through "stress tests" to evaluate their susceptibility to threats.</li>
        </ul>
        
        <p><em>"The Twitter Hack demonstrates, more than anything, the risk to society when systemically important institutions are left to regulate themselves."</em></p>
        
        <h3>Conclusion</h3>
        <p>The 2020 Twitter Hack stands as a critical reminder that even technologically advanced organisations are vulnerable to insider threats, particularly when combined with sophisticated social engineering. Protecting against these threats requires a comprehensive, proactive, and continuously evolving strategy that prioritises strong leadership, robust technical controls, ongoing employee education, and vigilant monitoring. Furthermore, the incident underscores the urgent need for enhanced regulatory oversight of systemically important social media platforms to safeguard against their potential weaponisation and ensure the integrity of our digital landscape.</p>
      `
    },
    {
      id: 2,
      title: 'The Deepfake Election Campaign',
      category: 'Real World Impact',
      readTime: '12 min',
      difficulty: 'Advanced',
      description: 'A detailed analysis of how deepfake technology was used in a recent political campaign and its implications.',
      keyLessons: ['Political misinformation', 'Deepfake detection', 'Media verification', 'Public awareness'],
      author: 'Provenance MLP',
      publishDate: '2024-12-10',
      tags: ['Deepfakes', 'Politics', 'Elections', 'AI Ethics'],
      content: `
        <h2>When AI Enters the Political Arena</h2>
        <p>In a recent election cycle, deepfake technology emerged as a powerful tool for political manipulation, marking a new era in digital misinformation. This case study examines how synthetic media was weaponized to influence public opinion and the broader implications for democratic processes.</p>
        
        <h3>The Campaign That Never Was</h3>
        <p>During the 2023 regional elections in Eastern Europe, voters were confronted with highly convincing video content showing a leading candidate making inflammatory statements about minority groups. The videos spread rapidly across social media platforms, garnering millions of views within 48 hours.</p>
        
        <h3>Technical Analysis</h3>
        <p>Forensic analysis revealed sophisticated deepfake techniques:</p>
        <ul>
          <li><strong>Face-swap technology:</strong> High-resolution facial mapping using GANs (Generative Adversarial Networks)</li>
          <li><strong>Voice synthesis:</strong> AI-generated speech matching the candidate's vocal patterns</li>
          <li><strong>Contextual placement:</strong> Videos placed in realistic settings to enhance credibility</li>
          <li><strong>Temporal consistency:</strong> Maintained lighting and shadow consistency across frames</li>
        </ul>
        
        <h3>Detection Challenges</h3>
        <p>The deepfakes were particularly challenging to detect because they:</p>
        <ul>
          <li>Used high-quality source material from legitimate speeches</li>
          <li>Incorporated subtle facial expressions and micro-movements</li>
          <li>Maintained consistent audio-visual synchronization</li>
          <li>Were distributed through multiple channels simultaneously</li>
        </ul>
        
        <h3>Detection Methods</h3>
        <p>Experts used several techniques to identify the synthetic content:</p>
        <ul>
          <li><strong>Temporal inconsistencies:</strong> Frame-by-frame analysis revealed unnatural blinking patterns</li>
          <li><strong>Compression artifacts:</strong> Different compression levels between face and background</li>
          <li><strong>Physiological impossibilities:</strong> Inconsistent pulse detection in facial blood flow</li>
          <li><strong>Metadata analysis:</strong> Creation timestamps and device fingerprints</li>
        </ul>
        
        <h3>Media Verification Response</h3>
        <p>News organizations and fact-checkers implemented rapid response protocols:</p>
        <ul>
          <li>Cross-referencing with verified campaign schedules</li>
          <li>Consulting with campaign representatives</li>
          <li>Using AI detection tools and forensic analysis</li>
          <li>Publishing detailed debunking reports with technical evidence</li>
        </ul>
        
        <h3>Public Awareness Impact</h3>
        <p>The incident led to significant changes in media literacy education:</p>
        <ul>
          <li>Schools integrated deepfake awareness into curricula</li>
          <li>Social media platforms enhanced detection algorithms</li>
          <li>Governments considered legislation requiring synthetic media labeling</li>
          <li>News organizations adopted stricter verification standards</li>
        </ul>
        
        <h3>Long-term Implications</h3>
        <p>This case highlighted the urgent need for:</p>
        <ul>
          <li>Advanced detection technologies accessible to journalists and citizens</li>
          <li>Legal frameworks addressing synthetic media in political contexts</li>
          <li>International cooperation on digital election security</li>
          <li>Public education on identifying and reporting suspicious content</li>
        </ul>
        
        <p>The incident serves as a wake-up call for democratic societies, demonstrating how AI technology can be weaponized to undermine trust in electoral processes and the critical importance of media literacy in the digital age.</p>
      `
    },
    {
      id: 3,
      title: 'COVID-19 Infodemic Investigation',
      category: 'Health Misinformation',
      readTime: '15 min',
      difficulty: 'Intermediate',
      description: 'Tracking the spread of health misinformation during the pandemic and lessons learned.',
      keyLessons: ['Health misinformation', 'Fact-checking', 'Source verification', 'Crisis communication'],
      author: 'Provenance MLP',
      publishDate: '2024-12-05',
      tags: ['Health', 'Pandemic', 'Fact-checking', 'Public Health'],
      content: `
        <h2>The Parallel Pandemic: Misinformation in a Health Crisis</h2>
        <p>As COVID-19 spread globally in early 2020, a parallel "infodemic" of misinformation spread even faster through digital channels. This investigation traces how false health information proliferated, its real-world consequences, and the lessons learned for future crisis communication.</p>
        
        <h3>The Perfect Storm</h3>
        <p>Several factors created ideal conditions for health misinformation:</p>
        <ul>
          <li><strong>Scientific uncertainty:</strong> Rapidly evolving understanding of the virus</li>
          <li><strong>Information vacuum:</strong> Limited official guidance in early stages</li>
          <li><strong>Fear and anxiety:</strong> Public desperation for answers and solutions</li>
          <li><strong>Social isolation:</strong> Increased reliance on digital information sources</li>
        </ul>
        
        <h3>Common Misinformation Themes</h3>
        <p>Our analysis identified recurring patterns in false health claims:</p>
        
        <h4>Origin Theories</h4>
        <ul>
          <li>Laboratory creation conspiracies</li>
          <li>Bioweapon allegations</li>
          <li>5G network connections</li>
          <li>Population control schemes</li>
        </ul>
        
        <h4>Prevention Myths</h4>
        <ul>
          <li>Miracle cures and supplements</li>
          <li>Household remedies (bleach, UV light)</li>
          <li>Religious or spiritual protection</li>
          <li>Dietary interventions without scientific basis</li>
        </ul>
        
        <h4>Treatment Misinformation</h4>
        <ul>
          <li>Unproven medications (hydroxychloroquine, ivermectin)</li>
          <li>Dangerous home remedies</li>
          <li>Anti-vaccination propaganda</li>
          <li>Alternative medicine claims</li>
        </ul>
        
        <h3>Spread Patterns and Amplification</h3>
        <p>Misinformation spread through predictable channels:</p>
        
        <h4>Social Media Ecosystems</h4>
        <ul>
          <li><strong>Facebook groups:</strong> Closed communities sharing unverified remedies</li>
          <li><strong>WhatsApp chains:</strong> Personal networks spreading "insider information"</li>
          <li><strong>YouTube videos:</strong> Pseudo-experts presenting alternative theories</li>
          <li><strong>Twitter threads:</strong> Rapid dissemination of unverified claims</li>
        </ul>
        
        <h4>Amplification Mechanisms</h4>
        <ul>
          <li>Emotional content receiving higher engagement</li>
          <li>Algorithm-driven recommendation systems</li>
          <li>Influencer and celebrity endorsements</li>
          <li>Cross-platform content migration</li>
        </ul>
        
        <h3>Real-World Consequences</h3>
        <p>The infodemic had measurable impacts on public health:</p>
        
        <h4>Direct Health Harms</h4>
        <ul>
          <li>Poisonings from ingesting disinfectants</li>
          <li>Delayed medical treatment due to fear</li>
          <li>Medication shortages from hoarding</li>
          <li>Attacks on healthcare workers</li>
        </ul>
        
        <h4>Public Health Measures</h4>
        <ul>
          <li>Reduced compliance with mask mandates</li>
          <li>Vaccine hesitancy and refusal</li>
          <li>Violation of social distancing guidelines</li>
          <li>Undermining of contact tracing efforts</li>
        </ul>
        
        <h3>Fact-Checking Response</h3>
        <p>The crisis prompted unprecedented fact-checking efforts:</p>
        
        <h4>Rapid Response Systems</h4>
        <ul>
          <li>24/7 monitoring of emerging claims</li>
          <li>Collaboration between international fact-checkers</li>
          <li>Direct partnerships with social media platforms</li>
          <li>Real-time debunking of viral content</li>
        </ul>
        
        <h4>Source Verification Protocols</h4>
        <ul>
          <li>Direct consultation with medical experts</li>
          <li>Cross-referencing with peer-reviewed research</li>
          <li>Verification of clinical trial data</li>
          <li>Authentication of official health communications</li>
        </ul>
        
        <h3>Platform Interventions</h3>
        <p>Social media companies implemented various countermeasures:</p>
        <ul>
          <li><strong>Content removal:</strong> Deletion of dangerous health misinformation</li>
          <li><strong>Warning labels:</strong> Flagging disputed or unverified claims</li>
          <li><strong>Reduced distribution:</strong> Limiting reach of flagged content</li>
          <li><strong>Authoritative sources:</strong> Promoting WHO and CDC information</li>
        </ul>
        
        <h3>Crisis Communication Lessons</h3>
        <p>The pandemic revealed critical insights for future health crises:</p>
        
        <h4>Proactive Communication</h4>
        <ul>
          <li>Fill information vacuums quickly with accurate data</li>
          <li>Acknowledge uncertainty while providing best available guidance</li>
          <li>Use multiple channels to reach diverse audiences</li>
          <li>Prepare for misinformation before it spreads</li>
        </ul>
        
        <h4>Trust Building</h4>
        <ul>
          <li>Maintain transparency about evolving scientific understanding</li>
          <li>Partner with trusted community leaders and influencers</li>
          <li>Address concerns and questions directly</li>
          <li>Admit mistakes and correct course when necessary</li>
        </ul>
        
        <h3>Long-term Implications</h3>
        <p>The COVID-19 infodemic has lasting effects on public health communication:</p>
        <ul>
          <li>Increased investment in health literacy programs</li>
          <li>Development of rapid-response misinformation monitoring systems</li>
          <li>Enhanced collaboration between health authorities and tech platforms</li>
          <li>Recognition of misinformation as a public health threat</li>
        </ul>
        
        <p>This investigation demonstrates that in health crises, accurate information is as crucial as medical interventions. The battle against misinformation requires coordinated efforts from health authorities, technology platforms, media organizations, and educated citizens working together to protect public health.</p>
      `
    }
  ];

  const VideoModal = ({ video, onClose }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-gradient-to-br from-deepblue-900 via-violet-900 to-deepblue-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white">{video.title}</h3>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white text-2xl transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="aspect-video mb-6 rounded-xl overflow-hidden border border-white/20 shadow-lg">
              <iframe
                src={video.embedUrl}
                title={video.title}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Learning Objectives</h4>
                <ul className="space-y-2">
                  {video.learningObjectives?.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/90 text-sm">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-3">Key Topics Covered</h4>
                <ul className="space-y-2">
                  {video.keyTopics?.map((topic, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Target className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/90 text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  const StoryTextModal = ({ story, onClose }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
         className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
           className="bg-white rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
           {/* Header */}
           <div className="bg-gradient-to-r from-deepblue-900 via-violet-900 to-deepblue-800 text-white p-8 rounded-t-3xl">
             <div className="flex justify-between items-start">
               <div className="flex-1">
                 <div className="flex items-center space-x-3 mb-4">
                   <span className="bg-gradient-to-r from-violet-500 to-electric-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-white/20">
                    {story.category}
                  </span>
                   <span className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                     {story.readTime}
                   </span>
                   <span className={`px-3 py-1 rounded-full text-sm font-semibold border border-white/20 ${
                     story.difficulty === 'Advanced' ? 'bg-red-500/20 text-red-300' :
                     story.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                     'bg-green-500/20 text-green-300'
                   }`}>
                     {story.difficulty}
                   </span>
                </div>
                 <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white via-violet-100 to-white bg-clip-text text-transparent leading-tight">
                   {story.title}
                 </h2>
                 <p className="text-violet-200 text-lg font-medium">
                   By {story.author} • {story.publishDate}
                 </p>
              </div>
              <button
                onClick={onClose}
                 className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-xl transition-all duration-300 ml-4"
              >
                <X className="h-6 w-6" />
              </button>
             </div>
            </div>
            
           {/* Content */}
           <div className="flex h-[calc(95vh-200px)]">
             {/* Main Content */}
             <div className="flex-1 overflow-y-auto p-8">
               <div className="max-w-4xl mx-auto">
                 <div className="prose prose-lg prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:mb-2 prose-strong:text-gray-900 prose-strong:font-semibold prose-em:text-gray-600 prose-blockquote:border-l-4 prose-blockquote:border-violet-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600">
              <div dangerouslySetInnerHTML={{ __html: story.content }} />
                 </div>
               </div>
            </div>
            
             {/* Sidebar */}
             <div className="w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto">
               <div className="sticky top-0">
                 <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center space-x-2">
                   <Target className="h-5 w-5 text-violet-600" />
                   <span>Key Learning Points</span>
                 </h4>
                 <div className="space-y-3 mb-8">
                {story.keyLessons.map((lesson, index) => (
                     <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                       <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-electric-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                         <CheckCircle className="h-3 w-3 text-white" />
                       </div>
                       <span className="text-gray-700 text-sm font-medium leading-relaxed">{lesson}</span>
                  </div>
                ))}
            </div>
            
                 <div className="border-t border-gray-200 pt-6">
                   <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center space-x-2">
                     <Bookmark className="h-5 w-5 text-violet-600" />
                     <span>Tags</span>
                   </h4>
              <div className="flex flex-wrap gap-2">
                {story.tags.map((tag, idx) => (
                       <span key={idx} className="bg-gradient-to-r from-violet-500 to-electric-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                    #{tag}
                  </span>
                ))}
                   </div>
                 </div>

                 <div className="border-t border-gray-200 pt-6 mt-6">
                   <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center space-x-2">
                     <Clock className="h-5 w-5 text-violet-600" />
                     <span>Reading Stats</span>
                   </h4>
                   <div className="space-y-2 text-sm text-gray-600">
                     <div className="flex justify-between">
                       <span>Estimated time:</span>
                       <span className="font-medium">{story.readTime}</span>
                     </div>
                     <div className="flex justify-between">
                       <span>Difficulty:</span>
                       <span className="font-medium">{story.difficulty}</span>
                     </div>
                     <div className="flex justify-between">
                       <span>Category:</span>
                       <span className="font-medium">{story.category}</span>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  const StoryVideoModal = ({ story, onClose }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [videoRef, setVideoRef] = useState(null);

    const togglePlay = () => {
      if (videoRef) {
        if (isPlaying) {
          videoRef.pause();
        } else {
          videoRef.play();
        }
        setIsPlaying(!isPlaying);
      }
    };



    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{story.title}</h3>
                  <p className="text-white/80">{story.description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-xl transition-all duration-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Video */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
              <video
                ref={setVideoRef}
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                muted={isMuted}
                controls
              >
                <source src={story.videoPath} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Play button overlay when paused */}
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="bg-white/90 hover:bg-white text-violet-600 p-8 rounded-full shadow-2xl backdrop-blur-sm transition-all duration-300"
                  >
                    <Play className="h-16 w-16 ml-2" />
                  </motion.button>
                </motion.div>
              )}
            </div>


          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'training':
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="grid gap-4 sm:gap-6">
              {trainingContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                >
                  {/* Dark Header Section */}
                  <div className="bg-gradient-to-br from-deepblue-900 via-violet-900 to-deepblue-800 p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
                      <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <item.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 leading-tight">{item.title}</h3>
                           <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/80">
                            <span className="flex items-center whitespace-nowrap">
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                              {item.duration}
                            </span>
                            <span className="flex items-center whitespace-nowrap">
                              <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                              {item.difficulty}
                            </span>
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border border-white/20 whitespace-nowrap ${
                              item.status === 'Coming Soon' 
                                 ? 'bg-orange-500/20 text-orange-300' 
                                 : 'bg-green-500/20 text-green-300'
                            }`}>
                              {item.status || 'Available'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {item.status !== 'Coming Soon' && (
                        <Link to={item.link} className="w-full sm:w-auto">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                             className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-electric-500 hover:from-violet-400 hover:to-electric-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg border border-white/20 hover:shadow-violet-500/25 text-sm sm:text-base"
                          >
                            <span>Start Training</span>
                            <ArrowRight className="h-4 w-4" />
                          </motion.button>
                        </Link>
                      )}
                    </div>
                    
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed">{item.description}</p>
                  </div>

                  {/* White Content Section */}
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                      <div>
                         <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Features</h4>
                        <ul className="space-y-2">
                          {item.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                               <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-electric-500 flex-shrink-0" />
                               <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                         <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Stats</h4>
                        <div className="space-y-2">
                          {item.stats && Object.entries(item.stats).map(([key, value], idx) => (
                            <div key={idx} className="flex justify-between text-xs sm:text-sm">
                               <span className="text-gray-600">{key}</span>
                              <span className={`font-medium ${
                                 key.includes('Points') ? 'text-electric-500' : 
                                 key.includes('Rate') || key.includes('Success') ? 'text-green-600' : 
                                 key.includes('Status') ? 'text-orange-600' : 'text-violet-600'
                              }`}>
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'videos':
        return (
          <div className="space-y-6 sm:space-y-8">
            {/* Featured Video */}
            {videosContent.find(v => v.featured) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                                 className="bg-gradient-to-r from-deepblue-900 via-violet-900 to-deepblue-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl mb-6 sm:mb-8 border border-white/10"
              >
                <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
                  <div className="relative">
                    <div className="aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-black relative group cursor-pointer">
                      <img 
                        src={videosContent.find(v => v.featured).thumbnailUrl}
                        alt={videosContent.find(v => v.featured).title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedVideo(videosContent.find(v => v.featured))}
                          className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 sm:p-6 transition-all duration-300"
                        >
                                                     <Play className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-violet-500 ml-1" />
                        </motion.button>
                      </div>
                      
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center space-x-1 sm:space-x-2">
                        <Youtube className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>Featured</span>
                      </div>
                      
                      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs sm:text-sm">
                        {videosContent.find(v => v.featured).duration}
                      </div>
                    </div>
                  </div>

                  <div className="text-white">
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                      <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                      <span className="bg-white bg-opacity-20 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">Featured Video</span>
                    </div>
                    
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{videosContent.find(v => v.featured).title}</h2>
                                         <p className="text-violet-200 text-base sm:text-lg mb-3 sm:mb-4">by {videosContent.find(v => v.featured).speaker}</p>
                    
                                         <p className="text-sm sm:text-base text-violet-100 leading-relaxed mb-4 sm:mb-6">
                      {videosContent.find(v => v.featured).description}
                    </p>
                    
                    <div className="flex space-x-3 sm:space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedVideo(videosContent.find(v => v.featured))}
                        className="btn-secondary px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold flex items-center space-x-2 text-sm sm:text-base"
                      >
                        <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Watch Now</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other Videos */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {videosContent.filter(v => !v.featured).map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
                >
                  <div className="aspect-video bg-gray-200 relative">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center space-x-2 mb-2 text-xs sm:text-sm">
                       <Video className="h-3 w-3 sm:h-4 sm:w-4 text-violet-600 flex-shrink-0" />
                       <span className="font-medium text-gray-700 truncate">{video.platform}</span>
                       <span className="text-gray-400">•</span>
                       <span className="text-gray-600 whitespace-nowrap">{video.views}</span>
                    </div>
                    
                     <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base leading-tight">{video.title}</h4>
                     <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{video.description}</p>
                    
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-violet-600 hover:text-violet-700 font-medium text-xs sm:text-sm"
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'podcasts':
        return (
          <div className="space-y-4 sm:space-y-6">
            {podcastsContent.map((podcast, index) => (
              <motion.div
                key={podcast.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-violet-500 to-electric-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Headphones className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-white" />
                  </div>
                  
                  <div className="flex-grow w-full min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 text-xs sm:text-sm">
                      <span className="bg-violet-100 text-violet-800 px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                        {podcast.platform}
                      </span>
                      <span className="text-gray-600 whitespace-nowrap">{podcast.episode}</span>
                      <span className="text-gray-600 whitespace-nowrap">{podcast.duration}</span>
                    </div>
                    
                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight">{podcast.title}</h3>
                   <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">{podcast.description}</p>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <span className="whitespace-nowrap">By {podcast.host}</span>
                        <span className="whitespace-nowrap">{podcast.downloads} downloads</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                          <span>{podcast.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePodcastPlay(podcast)}
                           className="flex-1 sm:flex-initial bg-gradient-to-r from-violet-500 to-electric-500 hover:from-violet-400 hover:to-electric-400 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg border border-white/20 hover:shadow-violet-500/25 text-sm"
                        >
                          {currentPodcastId === podcast.id && isPlaying ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                          <span>{currentPodcastId === podcast.id && isPlaying ? 'Pause' : 'Listen'}</span>
                        </motion.button>
                        
                        {podcast.audioFile && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={podcast.audioFile}
                            download
                           className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300 border border-gray-300 text-sm"
                          >
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">Download</span>
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Audio Progress Bar - Show when this podcast is playing */}
                    {currentPodcastId === podcast.id && currentAudio && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-gray-600 font-medium min-w-[40px]">
                            {formatTime(currentTime)}
                          </span>
                          
                          <div className="flex-1 relative group">
                            {/* Progress bar container */}
                            <div 
                              onClick={handleSeek}
                              className="w-full h-2 bg-gray-200 rounded-full cursor-pointer overflow-hidden hover:h-3 transition-all duration-200"
                            >
                              {/* Progress fill */}
                              <div 
                                className="h-full bg-gradient-to-r from-violet-500 to-electric-500 rounded-full transition-all duration-100"
                                style={{ width: `${audioProgress}%` }}
                              />
                            </div>
                            
                            {/* Hover thumb */}
                            <div 
                              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-violet-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                              style={{ left: `${audioProgress}%`, transform: 'translate(-50%, -50%)' }}
                            />
                          </div>
                          
                          <span className="text-xs text-gray-600 font-medium min-w-[40px]">
                            {formatTime(audioDuration)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {podcast.topics.map((topic, idx) => (
                         <span key={idx} className="bg-violet-100 text-violet-700 px-2 py-1 rounded text-xs border border-violet-200">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'stories':
        return (
          <div className="space-y-6 sm:space-y-8">
            {/* Featured Story Video */}
            {storiesContent.find(s => s.featured) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-deepblue-900 via-violet-900 to-deepblue-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl mb-6 border border-white/10"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Video Container - Left Side */}
                  <div className="relative p-4 sm:p-6">
                    <div className="aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-deepblue-950 to-violet-950 relative group cursor-pointer border border-white/20 shadow-lg">
                                             {/* Video Thumbnail Background */}
                       <div className="w-full h-full bg-gradient-to-br from-deepblue-900 via-violet-900 to-deepblue-800 relative overflow-hidden">
                         {/* Image Thumbnail */}
                         <img 
                           src={storiesContent.find(s => s.featured).thumbnail}
                           alt="Maya and the Truth Compass"
                           className="absolute inset-0 w-full h-full object-cover"
                           onError={(e) => {
                             // If image fails to load, hide it and show fallback
                             e.target.style.display = 'none';
                           }}
                         />
                        
                                                 {/* Fallback Background Pattern */}
                         <div className="absolute inset-0 bg-gradient-to-br from-deepblue-900 via-violet-900 to-deepblue-800">
                           {/* Decorative Pattern */}
                           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.3)_0%,transparent_50%)]"></div>
                           <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.2)_0%,transparent_50%)]"></div>
                           
                           {/* Animated Elements */}
                           <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-electric-500/20 rounded-full blur-3xl animate-pulse"></div>
                           <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-electric-500/20 to-violet-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                           
                           {/* Video Icon Placeholder */}
                           <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-violet-500/30 to-electric-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                               <Video className="h-8 w-8 sm:h-10 sm:w-10 text-white/80" />
                          </div>
                        </div>
                      </div>
                        
                        {/* Overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Video Title Overlay */}
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1">
                            Maya and the Truth Compass
                          </h3>
                          <p className="text-white/80 text-xs sm:text-sm">Interactive Story Experience</p>
                        </div>
                      </div>
                      
                      {/* Single Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-all duration-300">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedStory(storiesContent.find(s => s.featured))}
                          className="bg-gradient-to-br from-violet-500 to-electric-500 hover:from-violet-400 hover:to-electric-400 rounded-full p-3 sm:p-4 transition-all duration-300 shadow-xl border-2 border-white/30"
                        >
                          <Play className="h-6 w-6 sm:h-8 sm:w-8 text-white ml-1" />
                        </motion.button>
                      </div>
                      
                      {/* Professional Badges */}
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <div className="bg-gradient-to-r from-violet-600 to-electric-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg border border-white/20">
                          <Video className="h-3 w-3" />
                          <span>Featured</span>
                        </div>
                      </div>
                      
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                        <div className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium border border-white/20">
                        {storiesContent.find(s => s.featured).duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Container - Right Side */}
                  <div className="text-white p-4 sm:p-6 flex flex-col justify-center">
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Star className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                      </div>
                      <span className="bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                        Interactive Story
                      </span>
                    </div>
                    
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-white via-violet-100 to-white bg-clip-text text-transparent leading-tight">
                      {storiesContent.find(s => s.featured).title}
                    </h2>
                    <p className="text-violet-200 text-xs sm:text-sm mb-3 sm:mb-4 font-medium">
                      by {storiesContent.find(s => s.featured).author}
                    </p>
                    
                    <p className="text-white/90 leading-relaxed mb-4 sm:mb-6 text-xs sm:text-sm">
                      {storiesContent.find(s => s.featured).description}
                    </p>
                    
                    <div className="mb-4 sm:mb-6">
                      <h4 className="font-bold text-white mb-2 sm:mb-3 text-xs sm:text-sm flex items-center space-x-2">
                        <Target className="h-3 w-3 sm:h-4 sm:w-4 text-electric-400" />
                        <span>What You'll Learn</span>
                      </h4>
                      <ul className="space-y-2">
                        {storiesContent.find(s => s.featured).keyLessons.slice(0, 3).map((lesson, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-electric-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-white" />
                            </div>
                            <span className="text-white/90 text-xs font-medium">{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedStory(storiesContent.find(s => s.featured))}
                        className="bg-gradient-to-r from-violet-500 to-electric-500 hover:from-violet-400 hover:to-electric-400 text-white px-4 sm:px-6 py-2 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg border border-white/20 hover:shadow-violet-500/25 text-sm"
                      >
                        <Play className="h-4 w-4" />
                        <span>Watch Story</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 border border-white/20 text-sm"
                      >
                        <Bookmark className="h-4 w-4" />
                        <span>Save</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other Stories */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {storiesContent.filter(s => !s.featured).map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                    <span className="bg-gradient-to-r from-violet-500 to-electric-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-lg border border-white/20">
                      {story.category}
                    </span>
                    <span className="text-gray-600 text-xs font-medium whitespace-nowrap">{story.readTime || story.duration}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${
                      story.difficulty === 'Advanced' ? 'bg-red-100 text-red-700 border-red-200' :
                      story.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                      'bg-green-100 text-green-700 border-green-200'
                    }`}>
                      {story.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 leading-tight group-hover:text-violet-700 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                    {story.description}
                  </p>
                  
                  <div className="mb-3 sm:mb-4">
                    <h4 className="font-bold text-gray-900 mb-2 text-xs sm:text-sm flex items-center space-x-2">
                      <Target className="h-3 w-3 text-electric-500" />
                      <span>Key Lessons</span>
                    </h4>
                    <ul className="space-y-1">
                      {story.keyLessons.map((lesson, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-electric-500 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-white" />
                          </div>
                          <span className="text-gray-700 text-xs font-medium">{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 gap-3">
                    <div className="text-xs text-gray-600">
                      <div className="font-medium">By {story.author}</div>
                      <div>{story.publishDate}</div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedStory(story)}
                      className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-electric-500 hover:from-violet-400 hover:to-electric-400 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg border border-white/20 hover:shadow-violet-500/25 text-sm"
                    >
                      {story.type === 'video' ? <Play className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
                      <span>{story.type === 'video' ? 'Watch' : 'Read'}</span>
                    </motion.button>
                  </div>
                  
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-1">
                      {story.tags.map((tag, idx) => (
                        <span key={idx} className="bg-violet-100 text-violet-700 px-2 py-1 rounded-full text-xs font-medium border border-violet-200">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4"
        >
          Learning Hub
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4"
        >
          Master media literacy through comprehensive training, expert videos, insightful podcasts, and real-world case studies
        </motion.p>
      </div>

      {/* Tab Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12 px-2"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                isActive
                  ? `bg-${tab.color}-600 text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <tab.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <div className="text-left">
                <div className="whitespace-nowrap">{tab.label}</div>
                <div className={`text-xs hidden sm:block ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                  {tab.description}
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}

      {/* Story Modals */}
      {selectedStory && selectedStory.type === 'video' && (
        <StoryVideoModal 
          story={selectedStory} 
          onClose={() => setSelectedStory(null)} 
        />
      )}
      
      {selectedStory && selectedStory.type !== 'video' && (
        <StoryTextModal 
          story={selectedStory} 
          onClose={() => setSelectedStory(null)} 
        />
      )}
    </div>
  );
};

export default LearningHub;
