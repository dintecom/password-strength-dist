var MatPasswordStrengthValidator = /** @class */ (function () {
    function MatPasswordStrengthValidator() {
    }
    MatPasswordStrengthValidator.prototype.isUndefinedOrEmpty = function (control) {
        if (!control || !control.value || control.value.length === 0) {
            return undefined;
        }
    };
    MatPasswordStrengthValidator.prototype.validate = function (criteria, regex) {
        var _this = this;
        var validator = function (control) {
            _this.isUndefinedOrEmpty(control);
            if (!regex.test(control.value)) {
                var failed = {};
                failed[criteria] = {
                    actualValue: control.value,
                    requiredPattern: regex
                };
                return failed;
            }
            return undefined;
        };
        return validator;
    };
    MatPasswordStrengthValidator.prototype.confirm = function (password) {
        var _this = this;
        var validator = function (control) {
            _this.isUndefinedOrEmpty(control);
            if (control.value !== password) {
                return {
                    notConfirmed: {
                        password: password,
                        passwordConfirmation: control.value
                    }
                };
            }
            return undefined;
        };
        return validator;
    };
    return MatPasswordStrengthValidator;
}());
export { MatPasswordStrengthValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXBhc3N3b3JkLXN0cmVuZ3RoLXZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLW1hdGVyaWFsLWV4dGVuc2lvbnMvcGFzc3dvcmQtc3RyZW5ndGgvIiwic291cmNlcyI6WyJsaWIvdmFsaWRhdG9yL21hdC1wYXNzd29yZC1zdHJlbmd0aC12YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7SUFBQTtJQXdDQSxDQUFDO0lBdENDLHlEQUFrQixHQUFsQixVQUFtQixPQUF3QjtRQUN6QyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDNUQsT0FBTyxTQUFTLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBRUQsK0NBQVEsR0FBUixVQUFTLFFBQWdCLEVBQUUsS0FBYTtRQUF4QyxpQkFjQztRQWJDLElBQU0sU0FBUyxHQUFHLFVBQUMsT0FBd0I7WUFDekMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDOUIsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO2dCQUNsQixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUc7b0JBQ2pCLFdBQVcsRUFBRSxPQUFPLENBQUMsS0FBSztvQkFDMUIsZUFBZSxFQUFFLEtBQUs7aUJBQ3ZCLENBQUM7Z0JBQ0YsT0FBTyxNQUFNLENBQUM7YUFDZjtZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUMsQ0FBQztRQUNGLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCw4Q0FBTyxHQUFQLFVBQVEsUUFBZ0I7UUFBeEIsaUJBY0M7UUFiQyxJQUFNLFNBQVMsR0FBRyxVQUFDLE9BQXdCO1lBQ3pDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUM5QixPQUFPO29CQUNMLFlBQVksRUFBRTt3QkFDWixRQUFRLEVBQUUsUUFBUTt3QkFDbEIsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLEtBQUs7cUJBQ3BDO2lCQUNGLENBQUE7YUFDRjtZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUMsQ0FBQztRQUNGLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFSCxtQ0FBQztBQUFELENBQUMsQUF4Q0QsSUF3Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgVmFsaWRhdG9yRm59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNsYXNzIE1hdFBhc3N3b3JkU3RyZW5ndGhWYWxpZGF0b3Ige1xuXG4gIGlzVW5kZWZpbmVkT3JFbXB0eShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBhbnkgfCB1bmRlZmluZWQge1xuICAgIGlmICghY29udHJvbCB8fCAhY29udHJvbC52YWx1ZSB8fCBjb250cm9sLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZShjcml0ZXJpYTogc3RyaW5nLCByZWdleDogUmVnRXhwKTogVmFsaWRhdG9yRm4ge1xuICAgIGNvbnN0IHZhbGlkYXRvciA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcbiAgICAgIHRoaXMuaXNVbmRlZmluZWRPckVtcHR5KGNvbnRyb2wpO1xuICAgICAgaWYgKCFyZWdleC50ZXN0KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IGZhaWxlZCA9IHt9O1xuICAgICAgICBmYWlsZWRbY3JpdGVyaWFdID0ge1xuICAgICAgICAgIGFjdHVhbFZhbHVlOiBjb250cm9sLnZhbHVlLFxuICAgICAgICAgIHJlcXVpcmVkUGF0dGVybjogcmVnZXhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZhaWxlZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICByZXR1cm4gdmFsaWRhdG9yO1xuICB9XG5cbiAgY29uZmlybShwYXNzd29yZDogc3RyaW5nKTogVmFsaWRhdG9yRm4ge1xuICAgIGNvbnN0IHZhbGlkYXRvciA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0+IHtcbiAgICAgIHRoaXMuaXNVbmRlZmluZWRPckVtcHR5KGNvbnRyb2wpO1xuICAgICAgaWYgKGNvbnRyb2wudmFsdWUgIT09IHBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbm90Q29uZmlybWVkOiB7XG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgICAgICAgICBwYXNzd29yZENvbmZpcm1hdGlvbjogY29udHJvbC52YWx1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIHJldHVybiB2YWxpZGF0b3I7XG4gIH1cblxufVxuIl19