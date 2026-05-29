const normalizeSkills = (skills = []) =>
  skills.map((skill) => String(skill).trim().toLowerCase()).filter(Boolean);

export const calculateSkillMatch = (gigSkills = [], freelancerSkills = []) => {
  const required = normalizeSkills(gigSkills);
  const available = normalizeSkills(freelancerSkills);

  if (!required.length || !available.length) return 0;

  const matched = required.filter((skill) => available.includes(skill));
  return Math.round((matched.length / required.length) * 100);
};

export const recommendFreelancers = (gig, freelancers = []) => {
  return freelancers
    .map((profile) => ({
      profile,
      matchScore: calculateSkillMatch(gig.skillsRequired, profile.skills)
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
};
