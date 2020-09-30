import { animate, animation, keyframes, style } from '@angular/animations';
export function flipIn(timing, rotateX, rotateY) {
    const params = { timing: timing, delay: 0, rotateX, rotateY };
    return animation([
        style({ 'backface-visibility': 'visible' }),
        animate('{{ timing }}s {{ delay }}s ease-in', keyframes([
            style({
                opacity: 0,
                transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 90deg)',
                offset: 0,
            }),
            style({
                opacity: 1,
                transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -20deg)',
                offset: 0.4,
            }),
            style({
                transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 10deg)',
                offset: 0.6,
            }),
            style({
                transform: 'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -5deg)',
                offset: 0.8,
            }),
            style({
                transform: 'perspective(400px) rotate3d(0, 0, 0, 0)',
                offset: 1,
            }),
        ])),
    ], { params });
}
export const flipInX = flipIn(1, 1, 0);
export const flipInY = flipIn(1, 0, 1);
export const shake = animation(animate('{{ timing }}s {{ delay }}s', keyframes([
    style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
    style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.1 }),
    style({ transform: 'translate3d(10px, 0, 0)', offset: 0.2 }),
    style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.3 }),
    style({ transform: 'translate3d(10px, 0, 0)', offset: 0.4 }),
    style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.5 }),
    style({ transform: 'translate3d(10px, 0, 0)', offset: 0.6 }),
    style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.7 }),
    style({ transform: 'translate3d(10px, 0, 0)', offset: 0.8 }),
    style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.9 }),
    style({ transform: 'translate3d(0, 0, 0)', offset: 1 }),
])), { params: { timing: 1, delay: 0 } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLW1hdGVyaWFsLWV4dGVuc2lvbnMvcGFzc3dvcmQtc3RyZW5ndGgvc3JjL2xpYi9hbmltYXRpb25zL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUE4QixTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFckcsTUFBTSxVQUFVLE1BQU0sQ0FBQyxNQUFjLEVBQUUsT0FBZSxFQUFFLE9BQWU7SUFDckUsTUFBTSxNQUFNLEdBQUcsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDO0lBRTVELE9BQU8sU0FBUyxDQUNkO1FBQ0UsS0FBSyxDQUFDLEVBQUMscUJBQXFCLEVBQUUsU0FBUyxFQUFDLENBQUM7UUFDekMsT0FBTyxDQUNMLG9DQUFvQyxFQUNwQyxTQUFTLENBQUM7WUFDUixLQUFLLENBQUM7Z0JBQ0osT0FBTyxFQUFFLENBQUM7Z0JBQ1YsU0FBUyxFQUNQLHFFQUFxRTtnQkFDdkUsTUFBTSxFQUFFLENBQUM7YUFDVixDQUFDO1lBQ0YsS0FBSyxDQUFDO2dCQUNKLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFNBQVMsRUFDUCxzRUFBc0U7Z0JBQ3hFLE1BQU0sRUFBRSxHQUFHO2FBQ1osQ0FBQztZQUNGLEtBQUssQ0FBQztnQkFDSixTQUFTLEVBQ1AscUVBQXFFO2dCQUN2RSxNQUFNLEVBQUUsR0FBRzthQUNaLENBQUM7WUFDRixLQUFLLENBQUM7Z0JBQ0osU0FBUyxFQUNQLHFFQUFxRTtnQkFDdkUsTUFBTSxFQUFFLEdBQUc7YUFDWixDQUFDO1lBQ0YsS0FBSyxDQUFDO2dCQUNKLFNBQVMsRUFBRSx5Q0FBeUM7Z0JBQ3BELE1BQU0sRUFBRSxDQUFDO2FBQ1YsQ0FBQztTQUNILENBQUMsQ0FDSDtLQUNGLEVBQ0QsRUFBQyxNQUFNLEVBQUMsQ0FDVCxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN2QyxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFdkMsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FDNUIsT0FBTyxDQUNMLDRCQUE0QixFQUM1QixTQUFTLENBQUM7SUFDUixLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBQyxDQUFDO0lBQ3JELEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUM7SUFDM0QsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUMsQ0FBQztJQUMxRCxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBQyxDQUFDO0lBQzNELEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUM7SUFDMUQsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUMsQ0FBQztJQUMzRCxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBQyxDQUFDO0lBQzFELEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUM7SUFDM0QsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUMsQ0FBQztJQUMxRCxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBQyxDQUFDO0lBQzNELEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7Q0FDdEQsQ0FBQyxDQUNILEVBQ0QsRUFBQyxNQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUMsRUFBQyxDQUNoQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthbmltYXRlLCBhbmltYXRpb24sIEFuaW1hdGlvblJlZmVyZW5jZU1ldGFkYXRhLCBrZXlmcmFtZXMsIHN0eWxlfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZsaXBJbih0aW1pbmc6IG51bWJlciwgcm90YXRlWDogbnVtYmVyLCByb3RhdGVZOiBudW1iZXIpOiBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YSB7XG4gIGNvbnN0IHBhcmFtcyA9IHt0aW1pbmc6IHRpbWluZywgZGVsYXk6IDAsIHJvdGF0ZVgsIHJvdGF0ZVl9O1xuXG4gIHJldHVybiBhbmltYXRpb24oXG4gICAgW1xuICAgICAgc3R5bGUoeydiYWNrZmFjZS12aXNpYmlsaXR5JzogJ3Zpc2libGUnfSksXG4gICAgICBhbmltYXRlKFxuICAgICAgICAne3sgdGltaW5nIH19cyB7eyBkZWxheSB9fXMgZWFzZS1pbicsXG4gICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTpcbiAgICAgICAgICAgICAgJ3BlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCh7eyByb3RhdGVYIH19LCB7eyByb3RhdGVZIH19LCAwLCA5MGRlZyknLFxuICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICB0cmFuc2Zvcm06XG4gICAgICAgICAgICAgICdwZXJzcGVjdGl2ZSg0MDBweCkgcm90YXRlM2Qoe3sgcm90YXRlWCB9fSwge3sgcm90YXRlWSB9fSwgMCwgLTIwZGVnKScsXG4gICAgICAgICAgICBvZmZzZXQ6IDAuNCxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICB0cmFuc2Zvcm06XG4gICAgICAgICAgICAgICdwZXJzcGVjdGl2ZSg0MDBweCkgcm90YXRlM2Qoe3sgcm90YXRlWCB9fSwge3sgcm90YXRlWSB9fSwgMCwgMTBkZWcpJyxcbiAgICAgICAgICAgIG9mZnNldDogMC42LFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTpcbiAgICAgICAgICAgICAgJ3BlcnNwZWN0aXZlKDQwMHB4KSByb3RhdGUzZCh7eyByb3RhdGVYIH19LCB7eyByb3RhdGVZIH19LCAwLCAtNWRlZyknLFxuICAgICAgICAgICAgb2Zmc2V0OiAwLjgsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgdHJhbnNmb3JtOiAncGVyc3BlY3RpdmUoNDAwcHgpIHJvdGF0ZTNkKDAsIDAsIDAsIDApJyxcbiAgICAgICAgICAgIG9mZnNldDogMSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSlcbiAgICAgICksXG4gICAgXSxcbiAgICB7cGFyYW1zfVxuICApO1xufVxuXG5leHBvcnQgY29uc3QgZmxpcEluWCA9IGZsaXBJbigxLCAxLCAwKTtcbmV4cG9ydCBjb25zdCBmbGlwSW5ZID0gZmxpcEluKDEsIDAsIDEpO1xuXG5leHBvcnQgY29uc3Qgc2hha2UgPSBhbmltYXRpb24oXG4gIGFuaW1hdGUoXG4gICAgJ3t7IHRpbWluZyB9fXMge3sgZGVsYXkgfX1zJyxcbiAgICBrZXlmcmFtZXMoW1xuICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsIDAsIDApJywgb2Zmc2V0OiAwfSksXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTEwcHgsIDAsIDApJywgb2Zmc2V0OiAwLjF9KSxcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKScsIG9mZnNldDogMC4yfSksXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTEwcHgsIDAsIDApJywgb2Zmc2V0OiAwLjN9KSxcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKScsIG9mZnNldDogMC40fSksXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTEwcHgsIDAsIDApJywgb2Zmc2V0OiAwLjV9KSxcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKScsIG9mZnNldDogMC42fSksXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTEwcHgsIDAsIDApJywgb2Zmc2V0OiAwLjd9KSxcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKScsIG9mZnNldDogMC44fSksXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoLTEwcHgsIDAsIDApJywgb2Zmc2V0OiAwLjl9KSxcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLCAwLCAwKScsIG9mZnNldDogMX0pLFxuICAgIF0pXG4gICksXG4gIHtwYXJhbXM6IHt0aW1pbmc6IDEsIGRlbGF5OiAwfX1cbik7XG4iXX0=