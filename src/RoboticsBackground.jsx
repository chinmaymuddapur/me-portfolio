import { useEffect, useRef } from 'react';

export default function RoboticsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf;
    let time = 0;

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Robo-Soccer Scene
    class RoboSoccer {
      constructor() {
        this.ball = { x: W * 0.2, y: H * 0.7, vx: 2, vy: 0, r: 8 };
        this.robot1 = { x: W * 0.15, y: H * 0.7, targetX: W * 0.15 };
        this.robot2 = { x: W * 0.25, y: H * 0.7, targetX: W * 0.25 };
        this.goal = { x: W * 0.3, y: H * 0.7, w: 40, h: 60 };
      }

      update() {
        // Ball physics
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;
        this.ball.vy += 0.1; // gravity

        // Bounce
        if (this.ball.y + this.ball.r > H * 0.75) {
          this.ball.y = H * 0.75 - this.ball.r;
          this.ball.vy *= -0.7;
        }

        // Reset if out of bounds
        if (this.ball.x > W * 0.35 || this.ball.x < W * 0.1) {
          this.ball.x = W * 0.2;
          this.ball.y = H * 0.7;
          this.ball.vx = Math.random() * 2 + 1;
          this.ball.vy = -2;
        }

        // Robot 1 follows ball
        this.robot1.targetX = this.ball.x - 20;
        this.robot1.x += (this.robot1.targetX - this.robot1.x) * 0.05;

        // Robot 2 defends
        this.robot2.targetX = this.ball.x + 20;
        this.robot2.x += (this.robot2.targetX - this.robot2.x) * 0.03;
      }

      draw(ctx) {
        // Field lines
        ctx.strokeStyle = 'rgba(82,39,255,0.15)';
        ctx.lineWidth = 1;
        ctx.strokeRect(W * 0.1, H * 0.65, W * 0.25, H * 0.12);

        // Goal
        ctx.strokeStyle = 'rgba(255,159,252,0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.goal.x - this.goal.w / 2, this.goal.y - this.goal.h / 2, this.goal.w, this.goal.h);

        // Ball
        ctx.beginPath();
        ctx.arc(this.ball.x, this.ball.y, this.ball.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,159,252,0.6)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,159,252,0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Robot 1 (attacker)
        this.drawRobot(ctx, this.robot1.x, this.robot1.y, 'rgba(82,39,255,0.5)');

        // Robot 2 (defender)
        this.drawRobot(ctx, this.robot2.x, this.robot2.y, 'rgba(180,151,207,0.5)');
      }

      drawRobot(ctx, x, y, color) {
        // Body
        ctx.fillStyle = color;
        ctx.fillRect(x - 10, y - 15, 20, 25);
        
        // Head
        ctx.beginPath();
        ctx.arc(x, y - 20, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = 'rgba(255,159,252,0.8)';
        ctx.fillRect(x - 4, y - 22, 3, 3);
        ctx.fillRect(x + 1, y - 22, 3, 3);
        
        // Wheels
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(x - 12, y + 8, 6, 4);
        ctx.fillRect(x + 6, y + 8, 6, 4);
      }
    }

    // Robo-Race Scene
    class RoboRace {
      constructor() {
        this.robots = [
          { x: W * 0.5, y: H * 0.3, speed: 2.5, color: 'rgba(82,39,255,0.5)', lane: 0 },
          { x: W * 0.5, y: H * 0.35, speed: 2.2, color: 'rgba(255,159,252,0.5)', lane: 1 },
          { x: W * 0.5, y: H * 0.4, speed: 2.8, color: 'rgba(180,151,207,0.5)', lane: 2 },
        ];
        this.trackLength = W * 0.4;
      }

      update() {
        this.robots.forEach(robot => {
          robot.x += robot.speed;
          if (robot.x > W * 0.9) {
            robot.x = W * 0.5;
          }
        });
      }

      draw(ctx) {
        // Track lanes
        for (let i = 0; i < 3; i++) {
          ctx.strokeStyle = 'rgba(82,39,255,0.1)';
          ctx.lineWidth = 1;
          ctx.setLineDash([10, 5]);
          ctx.beginPath();
          ctx.moveTo(W * 0.5, H * 0.3 + i * 0.05 * H);
          ctx.lineTo(W * 0.9, H * 0.3 + i * 0.05 * H);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Start/Finish line
        ctx.strokeStyle = 'rgba(255,159,252,0.3)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(W * 0.5, H * 0.28);
        ctx.lineTo(W * 0.5, H * 0.43);
        ctx.stroke();

        // Robots
        this.robots.forEach(robot => {
          this.drawRaceRobot(ctx, robot.x, robot.y, robot.color);
        });
      }

      drawRaceRobot(ctx, x, y, color) {
        // Body (streamlined)
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x - 15, y);
        ctx.lineTo(x + 15, y - 5);
        ctx.lineTo(x + 15, y + 5);
        ctx.closePath();
        ctx.fill();
        
        // Cockpit
        ctx.fillStyle = 'rgba(255,159,252,0.6)';
        ctx.beginPath();
        ctx.arc(x - 5, y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Wheels
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.arc(x - 10, y + 6, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 8, y + 6, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Speed lines
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(x - 20 - i * 8, y - 3 + i * 3);
          ctx.lineTo(x - 25 - i * 8, y - 3 + i * 3);
          ctx.stroke();
        }
      }
    }

    // Robotic Arm Scene
    class RoboticArm {
      constructor() {
        this.base = { x: W * 0.7, y: H * 0.6 };
        this.angle1 = 0;
        this.angle2 = 0;
        this.targetAngle1 = Math.PI / 4;
        this.targetAngle2 = -Math.PI / 3;
        this.parts = [];
      }

      update() {
        // Smooth angle transitions
        this.angle1 += (this.targetAngle1 - this.angle1) * 0.02;
        this.angle2 += (this.targetAngle2 - this.angle2) * 0.02;

        // Change target periodically
        if (Math.abs(this.angle1 - this.targetAngle1) < 0.05) {
          this.targetAngle1 = Math.random() * Math.PI / 2;
          this.targetAngle2 = -Math.random() * Math.PI / 2;
        }

        // Calculate arm segments
        const seg1Length = 50;
        const seg2Length = 40;
        
        const joint1 = {
          x: this.base.x + Math.cos(this.angle1) * seg1Length,
          y: this.base.y + Math.sin(this.angle1) * seg1Length,
        };
        
        const end = {
          x: joint1.x + Math.cos(this.angle1 + this.angle2) * seg2Length,
          y: joint1.y + Math.sin(this.angle1 + this.angle2) * seg2Length,
        };

        this.parts = [this.base, joint1, end];
      }

      draw(ctx) {
        if (this.parts.length < 3) return;

        // Base
        ctx.fillStyle = 'rgba(82,39,255,0.4)';
        ctx.fillRect(this.base.x - 15, this.base.y, 30, 10);

        // Arm segments
        ctx.strokeStyle = 'rgba(255,159,252,0.5)';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        
        // Segment 1
        ctx.beginPath();
        ctx.moveTo(this.parts[0].x, this.parts[0].y);
        ctx.lineTo(this.parts[1].x, this.parts[1].y);
        ctx.stroke();
        
        // Segment 2
        ctx.strokeStyle = 'rgba(180,151,207,0.5)';
        ctx.beginPath();
        ctx.moveTo(this.parts[1].x, this.parts[1].y);
        ctx.lineTo(this.parts[2].x, this.parts[2].y);
        ctx.stroke();

        // Joints
        ctx.fillStyle = 'rgba(82,39,255,0.6)';
        this.parts.forEach(part => {
          ctx.beginPath();
          ctx.arc(part.x, part.y, 5, 0, Math.PI * 2);
          ctx.fill();
        });

        // Gripper
        ctx.strokeStyle = 'rgba(255,159,252,0.6)';
        ctx.lineWidth = 3;
        const gripperAngle = Math.sin(time * 0.05) * 0.2;
        ctx.beginPath();
        ctx.moveTo(this.parts[2].x, this.parts[2].y);
        ctx.lineTo(this.parts[2].x + Math.cos(gripperAngle) * 10, this.parts[2].y + Math.sin(gripperAngle) * 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.parts[2].x, this.parts[2].y);
        ctx.lineTo(this.parts[2].x + Math.cos(-gripperAngle) * 10, this.parts[2].y + Math.sin(-gripperAngle) * 10);
        ctx.stroke();
      }
    }

    const soccer = new RoboSoccer();
    const race = new RoboRace();
    const arm = new RoboticArm();

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      time++;

      soccer.update();
      soccer.draw(ctx);

      race.update();
      race.draw(ctx);

      arm.update();
      arm.draw(ctx);

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.4,
      }}
    />
  );
}
