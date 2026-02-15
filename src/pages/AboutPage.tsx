import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import ScrollReveal from '../components/ui/ScrollReveal'
import SectionHeading from '../components/ui/SectionHeading'
import styles from './AboutPage.module.css'

const features = [
  {
    icon: '\uD83C\uDFC6',
    title: '赛事中心',
    description:
      '实时追踪 FRC 赛事动态，查看赛程安排、比赛结果和排名数据，不错过任何精彩瞬间。',
  },
  {
    icon: '\uD83D\uDD27',
    title: '零件商城',
    description:
      '浏览和查找 FRC 机器人零部件，快速定位所需组件，为你的机器人找到最合适的解决方案。',
  },
  {
    icon: '\uD83D\uDCCB',
    title: '设备指南',
    description:
      '工作间设备选购推荐与使用指南，帮助战队搭建高效的机器人制作环境。',
  },
  {
    icon: '\uD83E\uDD1D',
    title: '战队目录',
    description:
      '发现和了解中国各地的 FRC 战队，促进队伍间的交流、学习与合作。',
  },
]

const contacts = [
  {
    icon: '\u2709\uFE0F',
    label: '电子邮箱',
    value: 'contact@frchub.cn',
    href: 'mailto:contact@frchub.cn',
  },
  {
    icon: '\uD83D\uDCF1',
    label: '微信公众号',
    value: 'FRC Hub',
    href: undefined,
  },
  {
    icon: '\uD83D\uDCAC',
    label: 'QQ 群',
    value: '即将开放',
    href: undefined,
  },
  {
    icon: '\uD83C\uDF10',
    label: 'GitHub',
    value: 'github.com/frc-hub',
    href: 'https://github.com/frc-hub',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <ScrollReveal>
          <div className={styles.heroInner}>
            <h1 className={styles.heroTitle}>关于 FRC Hub</h1>
            <p className={styles.heroDescription}>
              为中国 FRC 社区打造的一站式信息服务平台
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* What is FRC */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollReveal>
            <SectionHeading
              title="什么是 FRC？"
              subtitle="FIRST Robotics Competition"
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className={styles.prose}>
              FRC（FIRST Robotics Competition）是由美国非营利组织 FIRST 于 1992
              年创办的全球顶级高中生机器人竞赛。每年，来自世界各地的数千支队伍在短短六周内完成一台工业级机器人的设计、搭建和编程，并在赛场上通过完成指定的比赛任务一决高下。
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className={styles.prose}>
              FRC 不仅是一项技术竞赛，更是一个培养未来科技人才的教育平台。它强调
              STEM（科学、技术、工程、数学）教育的实践，注重团队合作精神与
              Gracious Professionalism（优雅的专业精神）——在激烈的竞争中保持尊重与协作。参赛学生不仅能掌握机械设计、电子控制、软件编程等专业技能，还能锻炼项目管理、商业运营和公众演讲等综合能力。
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className={styles.prose}>
              近年来，FRC 在中国蓬勃发展，越来越多的学校和学生加入这一充满挑战与激情的赛事。然而，中文社区的信息资源仍然相对分散，这正是
              FRC Hub 存在的意义。
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Platform Features */}
      <section className={styles.sectionAlt}>
        <div className={styles.containerWide}>
          <ScrollReveal>
            <SectionHeading
              title="平台功能"
              subtitle="FRC Hub 为你提供全方位的赛事与社区服务"
              centered
            />
          </ScrollReveal>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 100}>
                <Card hoverable padding="lg">
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>{feature.icon}</div>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollReveal>
            <SectionHeading title="我们的使命" />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className={styles.prose}>
              FRC Hub
              的使命是让每一支中国 FRC
              战队都能便捷地获取所需信息。我们深知，信息的不对称是许多新队伍面临的最大挑战之一——从赛事报名流程、零件采购渠道到技术学习资源，分散的信息来源增加了入门的难度。
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className={styles.prose}>
              我们致力于打造一个开放、共享的中文信息平台，整合赛事数据、零部件资源、设备指南和战队信息，降低参与
              FRC
              的门槛，让更多中国学生能够体验这项充满创造力与挑战的机器人竞赛。
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className={styles.missionHighlight}>
              <p className={styles.missionQuote}>
                "让信息不再成为障碍，让每一个热爱机器人的中国学生都能找到属于自己的舞台。"
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <ScrollReveal>
            <SectionHeading
              title="联系我们"
              subtitle="欢迎通过以下方式与我们取得联系"
              centered
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className={styles.contactGrid}>
              {contacts.map((item) => (
                <div key={item.label} className={styles.contactItem}>
                  <div className={styles.contactIcon}>{item.icon}</div>
                  <div className={styles.contactText}>
                    <p className={styles.contactLabel}>{item.label}</p>
                    {item.href ? (
                      <p className={styles.contactValue}>
                        <Link to={item.href} className={styles.contactLink}>
                          {item.value}
                        </Link>
                      </p>
                    ) : (
                      <p className={styles.contactValue}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
