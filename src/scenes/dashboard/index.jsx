import { Box, Button, IconButton, Typography, useTheme, Card, Avatar, Chip, Grid, Paper, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventIcon from "@mui/icons-material/Event";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const hoverScale = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // Responsive breakpoints
  const isXlScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isSmScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State for dashboard data
  const [stats, setStats] = useState({
    totalEtudiants: 0,
    totalPromotions: 0,
    totalFormations: 0,
    totalEnseignants: 0,
    newStudentsThisMonth: 0,
    activePromotions: 0,
    diplomatedStudents: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [topFormations, setTopFormations] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setStats({
        totalEtudiants: 23,
        totalPromotions: 12,
        totalFormations: 8,
        totalEnseignants: 45,
        newStudentsThisMonth: 23,
        activePromotions: 8,
        diplomatedStudents: 186
      });

      setRecentActivities([
        {
          id: 1,
          type: "etudiant",
          action: "Nouvel étudiant inscrit",
          name: "Marie Dupont",
          promotion: "M2DOSI",
          time: "Il y a 2 heures",
          avatar: "MD",
          color: colors.greenAccent[600]
        },
        {
          id: 2,
          type: "promotion",
          action: "Promotion créée",
          name: "M2DOSI 2024-2025",
          formation: "Master DOSI",
          time: "Il y a 5 heures",
          avatar: "M2",
          color: colors.blueAccent[600]
        },
        {
          id: 3,
          type: "formation",
          action: "Formation mise à jour",
          name: "Master Informatique",
          responsable: "Dr. Saliou",
          time: "Hier",
          avatar: "MI",
          color: colors.redAccent[600]
        },
        {
          id: 4,
          type: "enseignant",
          action: "Nouvel enseignant",
          name: "Dr. Laurent Martin",
          specialite: "Réseaux",
          time: "Il y a 2 jours",
          avatar: "LM",
          color: colors.primary[200]
        },
        {
          id: 5,
          type: "etudiant",
          action: "Étudiant diplômé",
          name: "Jean Gaonach",
          promotion: "CILI4",
          time: "Il y a 3 jours",
          avatar: "JG",
          color: colors.greenAccent[500]
        }
      ]);

      setUpcomingEvents([
        {
          id: 1,
          title: "Rentrée M2DOSI",
          date: "15 Sept 2024",
          location: "LC117A",
          type: "rentree",
          participants: 25
        },
        {
          id: 2,
          title: "Réunion pédagogique",
          date: "20 Sept 2024",
          location: "Salle 204",
          type: "reunion",
          participants: 12
        },
        {
          id: 3,
          title: "Soutenance de stage",
          date: "25 Sept 2024",
          location: "Amphi A",
          type: "soutenance",
          participants: 8
        },
        {
          id: 4,
          title: "Jury de sélection",
          date: "30 Sept 2024",
          location: "Salle 105",
          type: "jury",
          participants: 5
        }
      ]);

      setTopFormations([
        { name: "M2DOSI", students: 45, color: colors.greenAccent[500] },
        { name: "M1TIIL", students: 38, color: colors.blueAccent[500] },
        { name: "L3INFO", students: 52, color: colors.redAccent[500] }
      ]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const quickActions = [
    {
      label: "Ajouter Étudiant",
      icon: <SchoolIcon />,
      color: colors.blueAccent[600],
      path: "/etudiant/add",
      bgGradient: `linear-gradient(135deg, ${colors.blueAccent[700]} 0%, ${colors.blueAccent[500]} 100%)`
    },
    {
      label: "Créer Promotion",
      icon: <GroupsIcon />,
      color: colors.greenAccent[600],
      path: "/promotion/add",
      bgGradient: `linear-gradient(135deg, ${colors.greenAccent[700]} 0%, ${colors.greenAccent[500]} 100%)`
    },
    {
      label: "Nouvelle Formation",
      icon: <MenuBookIcon />,
      color: colors.redAccent[600],
      path: "/formation/add",
      bgGradient: `linear-gradient(135deg, ${colors.redAccent[700]} 0%, ${colors.redAccent[500]} 100%)`
    },
    {
      label: "Ajouter Enseignant",
      icon: <PersonIcon />,
      color: colors.primary[300],
      path: "/enseignant/add",
      bgGradient: `linear-gradient(135deg, ${colors.blueAccent[500]} 0%, ${colors.primary[300]} 100%)`
    }
  ];

  const mainStats = [
    {
      title: stats.totalEtudiants.toString(),
      subtitle: "Étudiants",
      progress: (stats.totalEtudiants / 300).toString(),
      increase: `+${stats.newStudentsThisMonth} ce mois`,
      icon: SchoolIcon,
      color: colors.greenAccent[600],
      path: "/etudiants"
    },
    {
      title: stats.totalPromotions.toString(),
      subtitle: "Promotions",
      progress: (stats.activePromotions / stats.totalPromotions).toString(),
      increase: `${stats.activePromotions} actives`,
      icon: GroupsIcon,
      color: colors.blueAccent[600],
      path: "/promotions"
    },
    {
      title: stats.totalFormations.toString(),
      subtitle: "Formations",
      progress: "0.60",
      increase: "+2 cette année",
      icon: MenuBookIcon,
      color: colors.redAccent[600],
      path: "/formations"
    },
    {
      title: stats.totalEnseignants.toString(),
      subtitle: "Enseignants",
      progress: "0.85",
      increase: "+5 cette année",
      icon: PersonIcon,
      color: colors.primary[200],
      path: "/enseignants"
    }
  ];

  return (
      <Box m={isMobile ? "10px" : isSmScreen ? "15px" : "20px"}>
        {/* HEADER */}
        <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            justifyContent="space-between"
            alignItems={isMobile ? "flex-start" : "center"}
            mb={isMobile ? "20px" : "30px"}
            gap={isMobile ? "15px" : "0"}
        >
          <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ width: isMobile ? '100%' : 'auto' }}
          >
            <Header
                title="TABLEAU DE BORD"
                subtitle="Vue d'ensemble du système de gestion académique"
            />
          </motion.div>


        </Box>

        {/* MAIN CONTENT */}
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          {/* STATS GRID - Responsive */}
          <Grid container spacing={isMobile ? 2 : 2.5} mb={isMobile ? 2 : 3}>
            {mainStats.map((stat, index) => (
                <Grid item xs={6} sm={6} md={3} key={index}>
                  <motion.div
                      variants={itemVariants}
                      whileHover="hover"
                      initial="rest"
                  >
                    <motion.div variants={hoverScale}>
                      <Box
                          backgroundColor={colors.primary[400]}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          borderRadius="12px"
                          height={isMobile ? "140px" : isSmScreen ? "160px" : "180px"}
                          sx={{
                            cursor: "pointer",
                            boxShadow: `0 4px 12px ${colors.primary[700]}`,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: `0 8px 24px ${colors.primary[700]}`,
                            }
                          }}
                          onClick={() => navigate(stat.path)}
                      >
                        <StatBox
                            title={stat.title}
                            subtitle={stat.subtitle}
                            progress={stat.progress}
                            increase={stat.increase}
                            icon={
                              <stat.icon
                                  sx={{ color: stat.color, fontSize: isMobile ? "22px" : "28px" }}
                              />
                            }
                        />
                      </Box>
                    </motion.div>
                  </motion.div>
                </Grid>
            ))}
          </Grid>

          {/* QUICK ACTIONS */}
          <motion.div variants={itemVariants}>
            <Box
                backgroundColor={colors.primary[400]}
                p={isMobile ? "15px" : "25px"}
                borderRadius="12px"
                boxShadow={`0 4px 12px ${colors.primary[700]}`}
                mb={isMobile ? 2 : 3}
            >
              <Box display="flex" alignItems="center" mb={isMobile ? "15px" : "20px"}>
                <AssignmentIcon sx={{ color: colors.blueAccent[500], mr: 1, fontSize: isMobile ? "22px" : "28px" }} />
                <Typography variant={isMobile ? "h5" : "h4"} fontWeight="600" color={colors.grey[100]}>
                  Actions Rapides
                </Typography>
              </Box>
              <Box
                  display="grid"
                  gridTemplateColumns={isMobile ? "1fr" : isSmScreen ? "repeat(2, 1fr)" : isMdScreen ? "repeat(2, 1fr)" : "repeat(4, 1fr)"}
                  gap={isMobile ? "10px" : "15px"}
              >
                {quickActions.map((action, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                    >
                      <Button
                          variant="contained"
                          startIcon={action.icon}
                          endIcon={isMobile ? <ArrowForwardIcon sx={{ fontSize: "16px" }} /> : null}
                          onClick={() => navigate(action.path)}
                          fullWidth
                          sx={{
                            background: action.bgGradient,
                            color: colors.grey[100],
                            padding: isMobile ? "12px 16px" : "14px 28px",
                            fontSize: isMobile ? "13px" : "15px",
                            fontWeight: "700",
                            borderRadius: "10px",
                            boxShadow: `0 4px 12px ${action.color}40`,
                            textTransform: "none",
                            justifyContent: isMobile ? "space-between" : "center",
                            "&:hover": {
                              boxShadow: `0 6px 20px ${action.color}60`,
                            }
                          }}
                      >
                        {action.label}
                      </Button>
                    </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* LOWER SECTION - Responsive Grid */}
          <Grid container spacing={isMobile ? 2 : 2.5}>
            {/* RECENT ACTIVITIES */}
            <Grid item xs={12} md={6} lg={4}>
              <motion.div variants={itemVariants}>
                <Box
                    backgroundColor={colors.primary[400]}
                    borderRadius="12px"
                    boxShadow={`0 4px 12px ${colors.primary[700]}`}
                    overflow="hidden"
                    height={isMobile ? "auto" : "100%"}
                    minHeight={isMobile ? "300px" : "400px"}
                    display="flex"
                    flexDirection="column"
                >
                  <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      borderBottom={`3px solid ${colors.primary[500]}`}
                      p={isMobile ? "15px" : "20px"}
                      flexShrink={0}
                  >
                    <Typography color={colors.grey[100]} variant={isMobile ? "h6" : "h5"} fontWeight="600">
                      Activités Récentes
                    </Typography>
                    <TrendingUpIcon sx={{ color: colors.greenAccent[500], fontSize: isMobile ? "20px" : "24px" }} />
                  </Box>
                  <Box overflow="auto" flex="1">
                    {recentActivities.map((activity, index) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                          <Box
                              display="flex"
                              alignItems="center"
                              gap={isMobile ? "8px" : "12px"}
                              borderBottom={`1px solid ${colors.primary[500]}`}
                              p={isMobile ? "12px" : "15px"}
                              sx={{
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  backgroundColor: colors.primary[500],
                                  cursor: "pointer",
                                  transform: "translateX(5px)"
                                }
                              }}
                          >
                            <Avatar
                                sx={{
                                  backgroundColor: activity.color,
                                  width: isMobile ? 38 : 45,
                                  height: isMobile ? 38 : 45,
                                  fontWeight: "bold",
                                  fontSize: isMobile ? "12px" : "14px",
                                  flexShrink: 0
                                }}
                            >
                              {activity.avatar}
                            </Avatar>
                            <Box flex="1" minWidth={0}>
                              <Typography
                                  color={colors.grey[100]}
                                  variant="body2"
                                  fontWeight="600"
                                  fontSize={isMobile ? "13px" : "14px"}
                                  noWrap
                              >
                                {activity.action}
                              </Typography>
                              <Typography color={colors.greenAccent[500]} fontSize={isMobile ? "12px" : "13px"} noWrap>
                                {activity.name}
                              </Typography>
                            </Box>
                            <Typography color={colors.grey[400]} fontSize={isMobile ? "10px" : "11px"} flexShrink={0}>
                              {activity.time}
                            </Typography>
                          </Box>
                        </motion.div>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* UPCOMING EVENTS */}
            <Grid item xs={12} md={6} lg={5}>
              <motion.div variants={itemVariants}>
                <Box
                    backgroundColor={colors.primary[400]}
                    borderRadius="12px"
                    boxShadow={`0 4px 12px ${colors.primary[700]}`}
                    overflow="hidden"
                    height={isMobile ? "auto" : "100%"}
                    minHeight={isMobile ? "300px" : "400px"}
                    display="flex"
                    flexDirection="column"
                >
                  <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      borderBottom={`3px solid ${colors.primary[500]}`}
                      p={isMobile ? "15px" : "20px"}
                      flexShrink={0}
                  >
                    <Box display="flex" alignItems="center" gap="10px">
                      <EventIcon sx={{ color: colors.blueAccent[500], fontSize: isMobile ? "20px" : "26px" }} />
                      <Typography color={colors.grey[100]} variant={isMobile ? "h6" : "h5"} fontWeight="600">
                        Événements à Venir
                      </Typography>
                    </Box>
                    <Chip
                        label={upcomingEvents.length}
                        size="small"
                        sx={{
                          backgroundColor: colors.blueAccent[700],
                          color: colors.grey[100],
                          fontWeight: "600"
                        }}
                    />
                  </Box>
                  <Box overflow="auto" flex="1">
                    {upcomingEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                          <Box
                              display="flex"
                              flexDirection={isMobile ? "column" : "row"}
                              justifyContent="space-between"
                              alignItems={isMobile ? "flex-start" : "center"}
                              gap={isMobile ? "8px" : "0"}
                              borderBottom={`1px solid ${colors.primary[500]}`}
                              p={isMobile ? "15px" : "18px"}
                              sx={{
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  backgroundColor: colors.primary[500],
                                  cursor: "pointer",
                                  borderLeft: `4px solid ${colors.blueAccent[500]}`
                                }
                              }}
                          >
                            <Box flex="1" minWidth={0}>
                              <Typography
                                  color={colors.blueAccent[500]}
                                  variant="subtitle1"
                                  fontWeight="600"
                                  fontSize={isMobile ? "14px" : "15px"}
                              >
                                {event.title}
                              </Typography>
                              <Box display="flex" alignItems="center" gap="5px" mt="5px" flexWrap="wrap">
                                <AccessTimeIcon sx={{ fontSize: isMobile ? "12px" : "14px", color: colors.grey[400] }} />
                                <Typography color={colors.grey[300]} fontSize={isMobile ? "12px" : "13px"}>
                                  {event.location} • {event.participants} participants
                                </Typography>
                              </Box>
                            </Box>
                            <Chip
                                label={event.date}
                                size="small"
                                sx={{
                                  backgroundColor: colors.greenAccent[700],
                                  color: colors.grey[100],
                                  fontWeight: "600",
                                  fontSize: isMobile ? "11px" : "12px",
                                  alignSelf: isMobile ? "flex-start" : "center"
                                }}
                            />
                          </Box>
                        </motion.div>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* RIGHT COLUMN - Performance & Top Formations */}
            <Grid item xs={12} lg={3}>
              <Grid container spacing={isMobile ? 2 : 2.5}>
                {/* PERFORMANCE */}
                <Grid item xs={12} sm={6} lg={12}>
                  <motion.div variants={itemVariants}>
                    <Box
                        backgroundColor={colors.primary[400]}
                        borderRadius="12px"
                        boxShadow={`0 4px 12px ${colors.primary[700]}`}
                        p={isMobile ? "20px" : "25px"}
                        height="100%"
                        minHeight={isMobile ? "250px" : "auto"}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                    >
                      <Box display="flex" alignItems="center" mb="15px">
                        <EmojiEventsIcon sx={{ color: colors.greenAccent[500], mr: 1, fontSize: isMobile ? "22px" : "26px" }} />
                        <Typography variant={isMobile ? "h6" : "h5"} fontWeight="600">
                          Taux de Réussite
                        </Typography>
                      </Box>
                      <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          mt="10px"
                      >
                        <ProgressCircle size={isMobile ? "100" : "125"} progress="0.75" />
                        <Typography
                            variant={isMobile ? "h5" : "h4"}
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                            fontWeight="700"
                        >
                          75%
                        </Typography>
                        <Typography color={colors.grey[300]} mt="8px" fontSize={isMobile ? "13px" : "14px"} textAlign="center">
                          {stats.diplomatedStudents} étudiants diplômés
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>

                {/* TOP FORMATIONS */}
                <Grid item xs={12} sm={6} lg={12}>
                  <motion.div variants={itemVariants}>
                    <Box
                        backgroundColor={colors.primary[400]}
                        borderRadius="12px"
                        boxShadow={`0 4px 12px ${colors.primary[700]}`}
                        p={isMobile ? "20px" : "25px"}
                        height="100%"
                        minHeight={isMobile ? "250px" : "auto"}
                    >
                      <Typography variant={isMobile ? "h6" : "h5"} fontWeight="600" mb="20px">
                        Top Formations
                      </Typography>
                      {topFormations.map((formation, index) => (
                          <Box key={index} mb="20px">
                            <Box display="flex" justifyContent="space-between" mb="8px">
                              <Typography color={colors.grey[100]} fontSize={isMobile ? "13px" : "14px"} fontWeight="600">
                                {formation.name}
                              </Typography>
                              <Typography color={formation.color} fontWeight="700" fontSize={isMobile ? "13px" : "14px"}>
                                {formation.students}
                              </Typography>
                            </Box>
                            <Box
                                height={isMobile ? "6px" : "8px"}
                                backgroundColor={colors.primary[500]}
                                borderRadius="4px"
                                overflow="hidden"
                            >
                              <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(formation.students / 60) * 100}%` }}
                                  transition={{ duration: 1, delay: index * 0.2 }}
                                  style={{
                                    height: "100%",
                                    backgroundColor: formation.color,
                                    borderRadius: "4px"
                                  }}
                              />
                            </Box>
                          </Box>
                      ))}
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </motion.div>
      </Box>
  );
};

export default Dashboard;